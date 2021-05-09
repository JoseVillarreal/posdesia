var express = require('express');
var router = express.Router();
var poems = require('./poems.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET all poems */
router.get('/poems', function (req, res, next) {
  res.render('poems_list', { title: 'All Poems' });
});

/*POST submit a poem */
router.post('/poems', function (req, res, next) {
  poem.addPoem(req);
  res.send(200);
});

/* GET single poem */
router.get('/poems/:poemId', function (req, res, next) {
  var poem = poems.loadSinglePoem(req, res);
  res.render('single_poem', {title: poem.title || "untitled", poem: poem} );
});

/* POST add comments / annotations to poem */
router.post ('/poems/:poemId', function (req, res, next) {
  poems.addComment(req);
  res.send(200);
});

module.exports = router;
