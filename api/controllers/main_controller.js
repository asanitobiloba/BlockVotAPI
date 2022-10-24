const db = require('../app/db.config');
const admin = db.admin
var Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


exports.rootpage = (req,res)=>{
  res.send({
    status:true,
    message:"Hello World From blockChain Api"
  })
}

exports.jevotingCustomMethod = (req,res)=>{
  res.send([1,2,3]);
}

exports.jgreetingCustomMethod = (req,res)=>{
  res.send('Hello World');
}


exports.adminlogin = (req,res)=>{
  const body = req.body;
  if(body.username != "admin" || body.password != 'magnitude') return res.sendStatus(401);
  var userid = 1;
  var token = jwt.sign({userID: userid}, 'super-shared-secret', {expiresIn: '2h'});
  res.send({token});
}

exports.register_occupants_to_device = (req,res)=>{
    // register device to occupant
    admin.create({
      deviceId:req.body.deviceid,
      guest_fname:req.body.guest_fname,
      guest_lname:req.body.guest_lname,
      guest_tag: req.body.guest_tag
    }).then(result=>{
      res.send({
        status:true,
        message:"user successfully assigned"
      })
    })
}