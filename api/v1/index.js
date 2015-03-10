var router 	    = new require('express').Router()
  , bodyParser  = require('body-parser')
	, Cloud 	    = require('./cloud')
  , Hash        = require('./hash')
  , Sec         = require('./sec')
;

router.use(bodyParser());

exports.route = function(app){
  app.use('/api/v1', router);
  app.use('/api/v1', Cloud.router);
  app.use('/api/v1', Hash.router);
  app.use('/api/v1', Sec.router);
  app.use(function(err, req, res, next){
    console.error(err.stack || err);
    res.status(500).send('ಠ_ಠ This is why we can\'t have nice things.');
  });
};