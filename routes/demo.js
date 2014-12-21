var express = require('express');
var router = express.Router();

router.get('/example', function (req, res) {
  res.render('index', { title: 'Demo' })
});

router.get('/:id', function (req, res) {
  res.json({name: 'get:'+req.params.id});
});

router.delete('/:id', function (req, res) {
  res.json({name: 'delete:'+req.params.id});
});

router.post('/:id', function (req, res) {
  res.json({name: 'post:'+req.params.id});
});

router.put('/:id', function (req, res) {
  res.json({name: 'put:'+req.params.id});
});

module.exports = router;