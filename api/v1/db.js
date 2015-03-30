var router = new require('express').Router()
  , $fh    = require('fh-mbaas-api')
;

router.route('/db/:type')

  .get(function(req, res, next){
    $fh.db({
      act:    'list',
      type:   req.params.type
    }, function (err, data) {
      if(err) { 
        return next(err);
      }

      res.send(data);
    });
  })

  .post(function(req, res, next){
    $fh.db({
      act:    'create',
      type:   req.params.type,
      fields: req.body.fields
    }, function (err, data) {
      if(err) { 
        return next(err);
      }

      res.send(data);
    });
  })

  .delete(function(req, res, next){
    $fh.db({
      act:    'deleteall',
      type:   req.params.type
    }, function (err, data) {
      if(err) { 
        return next(err);
      }

      res.send(data);
    });
  })

;

router.route('/db/:type/:guid')

  .get(function(req, res, next){
    $fh.db({
      act:    'read',
      type:   req.params.type,
      guid:   req.params.guid
    }, function (err, data) {
      if(err) { 
        return next(err);
      }

      res.send(data);
    });
  })

  .post(function(req, res, next){
    $fh.db({
      act:    'update',
      type:   req.params.type,
      guid:   req.params.guid,
      fields: req.body.fields
    }, function (err, data) {
      if(err) { 
        return next(err);
      }
      res.send(data);
    });
  })

  .delete(function(req, res, next){
    $fh.db({
      act:    'delete',
      type:   req.params.type,
      guid:   req.params.guid
    }, function (err, data) {
      if(err) { 
        return next(err);
      }

      res.send(data);
    });
  })

;

exports.router = router;