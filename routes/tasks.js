var express = require('express');
var router = express.Router();

router.route('/')
  .get(function(req,res){
    console.log('in handler');
  res.json({ message : 'task list'});
});


module.exports = router;