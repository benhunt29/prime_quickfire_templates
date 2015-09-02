var express = require('express');
var router = express.Router();
var students = require('../models/students.json');
var path = require('path');
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(students[students.length-1]);
});

router.post('/',function(req,res,next){
  var studentsArray = students;

  var file = path.join(__dirname,'../models/students.json');

  studentsArray.push({"firstName":req.body.firstName,"lastName":req.body.lastName});

  fs.writeFile(file,JSON.stringify(studentsArray),function(err,data){
    if(err) {
      console.log(err);
      res.sendStatus(500).send(err);
    }else{
      res.json(studentsArray);
      //res.sendStatus(200);
      }

  });



});

module.exports = router;
