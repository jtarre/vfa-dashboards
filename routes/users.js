var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("get!");
  var id = req.param('id');
  console.log("id: " + id);
  var body = req.body;
  var bodyJ = JSON.stringify(body)
  console.log("body: " + bodyJ);
  for (data in bodyJ) {
  	console.log("body: " + data);
  }
  
  res.render('users');
  //res.send('respond with a resource');
});

module.exports = router;
