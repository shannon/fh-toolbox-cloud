var router 	    = new require('express').Router()
  , bodyParser  = require('body-parser')
  , $fh         = require('fh-mbaas-api')
	, Cloud 	    = require('./cloud')
  , Hash        = require('./hash')
  , Sec         = require('./sec')
  , Service     = require('./service')
  , Db          = require('./db')
  , Cache       = require('./cache')
;


var parser = bodyParser();

router.use(function(req, res, next){
  var start = Date.now();

  $fh.stats.inc('inc');
  $fh.stats.inc('inc');
  $fh.stats.dec('inc'); //this is just to test stats framework
  res.on('finish', function(){
    $fh.stats.timing('time', Date.now() - start);
  });

  if(['POST', 'PUT'].indexOf(req.method) !== -1){
    return parser(req, res, next);
  }
  next();
});

exports.route = function(app){
  app.use('/api/v1', router);
  app.use('/api/v1', Cloud.router);
  app.use('/api/v1', Hash.router);
  app.use('/api/v1', Sec.router);
  app.use('/api/v1', Service.router);
  app.use('/api/v1', Db.router);
  app.use('/api/v1', Cache.router);
  app.use(function(err, req, res, next){
    console.error(err.stack || err);
    res.status(500).send('ಠ_ಠ This is why we can\'t have nice things.');
  });
};