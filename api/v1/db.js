var router = new require('express').Router()
  , $fh    = require('fh-mbaas-api')
;

router.route('/db')

  .get(function(req, res, next){
    $fh.db({
      act:    'list',
      type:   'entries'
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
      type:   'entries',
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
      type:   'entries'
    }, function (err, data) {
      if(err) { 
        return next(err);
      }

      res.send(data);
    });
  })

;

router.route('/db/:guid')

  .get(function(req, res, next){
    $fh.db({
      act:    'read',
      type:   'entries',
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
      type:   'entries',
      guid:   req.params.guid,
      fields: req.body
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
      type:   'entries',
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