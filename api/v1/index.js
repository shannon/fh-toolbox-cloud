var router 	    = new require('express').Router()
  , bodyParser  = require('body-parser')
	, Cloud 	    = require('./cloud')
;

router.use(bodyParser());

exports.route = function(app){
  app.use('/api/v1', router);
  app.use('/api/v1', Cloud.router);
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('ಠ_ಠ This is why we can\'t have nice things.');
  });
};