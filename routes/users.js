var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req);
  res.render('users', { title: 'Express' });
});
/**When player connect render index page with the name of the player */
router.post('/index',function(req,res,next){
  res.render('index',{userName :req.body.userName})
  });
module.exports = router;
