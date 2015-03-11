var router      = new require('express').Router()
;

router.route('/cloud').post(function(req, res, next){
  res.send({ message: 'Hello from the cloud ' + req.body.name + '!' });
});

exports.router = router;