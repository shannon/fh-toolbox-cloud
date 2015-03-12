var router  = new require('express').Router()
  , health  = require('fh-health')
  , Request = require('request')
  , async   = require('async')
  , root    = 'http://127.0.0.1:' + (process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001);
;

health.init();

function handleRequest(callback){
  return function(err, response, body){
    if(err){ return callback(err); }
    if(response.statusCode !== 200){
      return callback('Server Error: ' + body);
    }
    callback(null, body);
  }
}

health.addCriticalTest('/api/v1/cloud', function(next){
  Request.post(root + '/api/v1/cloud', { form: { name: 'test' } }, handleRequest(next));
});

health.addCriticalTest('/api/v1/service', function(next){
  var services = JSON.parse(process.env.HEALTH_ENDPOINT_SERVICES || '[]');

  async.parallel(services.map(function(guid){
    return function(done){
      Request.post(root + '/api/v1/service', { form: { guid: guid, method: 'GET', path: '/sys/info/ping' } }, handleRequest(next));
    }
  }), function(err, result){
    next(err, result);
  })
  
});

health.addCriticalTest('/api/v1/hash', function(next){
  async.parallel(['MD5', 'SHA1', 'SHA256', 'SHA512'].map(function(alg){
    return function(done){ Request.post(root + '/api/v1/hash', { form: { algorithm: alg, text: 'test'} }, handleRequest(done)); }
  }), function(err, result){
    next(err, result);
  })
});

health.addCriticalTest('/api/v1/sec', function(next){

  function post(alg, keysize, done){
    var params = {
      algorithm: alg, 
      keysize: keysize 
    };

    async.waterfall([
      function(next) {
        Request.post(root + '/api/v1/sec', { form: { act: 'keygen', params: params } }, handleRequest(next));
      },
      function(res, next) {
        res = JSON.parse(res);
        params.public     = res.public;
        params.private    = res.private;
        params.modulo     = res.modulo;
        params.key        = res.secretkey;
        params.iv         = res.iv;
        params.plaintext  = alg + ':' + keysize;

        Request.post(root + '/api/v1/sec', { form: { act: 'encrypt', params: params } }, handleRequest(next));
      },
      function(res, next) {
        res = JSON.parse(res);
        params.ciphertext = res.ciphertext;
        Request.post(root + '/api/v1/sec', { form: { act: 'decrypt', params: params } }, handleRequest(next));
      }
    ], done);
  }

  async.parallel([
    function(done) { post('AES', 128, done); },
    function(done) { post('RSA', 1024, done); },
    function(done) { post('RSA', 2048, done); }
  ], function(err, result){
    next(err, result);
  })
});

health.addCriticalTest('/api/v1/cache', function(next){
  async.series([
    function(next) { Request.post(root + '/api/v1/cache/health', { form: { value: 'test' } }, handleRequest(next)); },
    function(next) { Request.get(root + '/api/v1/cache/health', handleRequest(next)); },
    function(next) { Request.del(root + '/api/v1/cache/health', handleRequest(next)); }
  ], function(err, result){
    next(err, result);
  })
});


health.addCriticalTest('/api/v1/db', function(next){

  async.waterfall([
    function(next){ Request.post(root + '/api/v1/db/health', { form: { fields: { test: 'test' } } }, handleRequest(next)); },
    function(res, next){
      res = JSON.parse(res);

      async.series([
        function(next){ Request.get(root + '/api/v1/db/health/' + res.guid, handleRequest(next)); },
        function(next){ Request.post(root + '/api/v1/db/health/' + res.guid, { form: { fields: { test: 'test' } } }, handleRequest(next)); },
        function(next){ Request.del(root + '/api/v1/db/health/' + res.guid, handleRequest(next)); }
      ], next)
    },
    function(res, next){ Request.get(root + '/api/v1/db/health', handleRequest(next)); },
    function(res, next){ Request.del(root + '/api/v1/db/health', handleRequest(next)); }
  ], function(err, result){
    next(err, result);
  });
});


router.route('/health').get(function(req, res, next){
  health.runTests(function(err, testResult) {
    res.end(testResult);
  });
});

exports.router = router; 