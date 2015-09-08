var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("get!");
  var id = req.param('id');
  console.log("id: " + id);
  res.render('users', 
  	{
  		test : id
  	});
  //res.send('respond with a resource');
});

module.exports = router;
