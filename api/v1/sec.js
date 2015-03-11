var router = new require('express').Router()
  , $fh    = require('fh-mbaas-api')
;

router.route('/sec').post(function(req, res, next){
  $fh.sec(req.body, function (err, result) {
    if (err) {
      return next(err);
    }

    res.send(result);
  });
});

exports.router = router;