var router = new require('express').Router()
  , $fh    = require('fh-mbaas-api')
;

router.route('/service').post(function(req, res, next){
  $fh.service({
    guid :  req.body.guid,
    path:   req.body.path, 
    method: req.body.method,
    params: req.body.params || {},
    headers: req.body.headers || {}
  }, function(err, body, response) {
    if ( err ) {
      return next(err);
    } else {
      res.send(body);
    }
  });
});


exports.router = router;