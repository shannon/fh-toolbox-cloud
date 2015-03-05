var v1      = require('./v1/')
;

exports.route = function(app){  
  v1.route(app);
  
  app.use('/api', function(req, res, next){
    res.status(404).send('Route or Method not found');
  });
};