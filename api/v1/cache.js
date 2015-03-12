var router = new require('express').Router()
  , $fh    = require('fh-mbaas-api')
;

router.route('/cache')

  .get(function(req, res, next){
    $fh.cache({
      act:    'load',
      key:    'test'
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
      key:    'test',
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
      type:   'test'
    }, function (err, data) {
      if(err) { 
        return next(err);
      }

      res.send(data);
    });
  })

;

exports.router = router;