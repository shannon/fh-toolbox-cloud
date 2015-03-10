var router = new require('express').Router()
  , $fh    = require('fh-mbaas-api')
;

router.route('/hash').post(function(req, res, next){
  $fh.hash(req.body, function (err, result) {
    if (err) {
      return next(err);
    }
    
    res.json(result);
  });
})

exports.router = router;