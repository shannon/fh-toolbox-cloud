var router = new require('express').Router()
  , $fh    = require('fh-mbaas-api')
;

router.route('/cache/:key')

  .get(function(req, res, next){
    $fh.cache({
      act:    'load',
      key:    req.params.key
    }, function (err, data) {
      if(err) { 
        return next(err);
      }

      res.send(data);
    });
  })

  .post(function(req, res, next){
    var value = JSON.stringify({ value: req.body.value, expire: Date.now() + 60000 });
    
    $fh.cache({
      act:    'save',
      key:    req.params.key,
      value:  value,
      expire: 60
    }, function (err, data) {
      if(err) { 
        return next(err);
      }

      res.send(value);
    });
  })

  .delete(function(req, res, next){
    $fh.cache({
      act:    'remove',
      type:   req.params.key
    }, function (err, data) {
      if(err) { 
        return next(err);
      }

      res.send({ message: 'cache cleared'});
    });
  })

;

exports.router = router;