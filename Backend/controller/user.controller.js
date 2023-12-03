
import '../models/connection.js';
import url from 'url';
import UserSchemaModel from '../models/user.modle.js';
import jwt from 'jsonwebtoken';
import rs from 'randomstring';
import sendEmail from './email.controller.js';

export const login =async function(req,res,next){
    var condition_obj = {...req.body,"status":1};
   var userList =await UserSchemaModel.find(condition_obj);
   if(userList.length!=0)
   {  
    var key = rs.generate();
    var payload = {"email":userList[0].email};
    var token = jwt.sign(payload,key);
    res.status(201).json({"status":true,"token":token,"RandomString":key,"userDetails":userList[0]});
   }
   else
   res.status(404).json({"token":"error"})
}
export const save =async function(req,res,next){
    var userdet =await UserSchemaModel.find().sort({_id: -1});
    var _id = userdet.length==0?1:userdet[0]._id+1;
    var userDetails = {...req.body,"_id":_id,"status":0,"role":"user","info":Date()};
    try{
        await UserSchemaModel.create(userDetails);
        sendEmail(userDetails.email,userDetails.password);
        res.status(201).json({"status":true});
    }
    catch{
        res.status(500).json({"status":false});
    }
       
}

export const fetch =async function(req,res,next){
    var userDetails = url.parse(req.url,true).query;
    var userList =await UserSchemaModel.find(userDetails);
    // console.log(userList);
     if(userList.length!=0)
         res.status(201).json(userList);
     else 
         res.status(500).json({"status":"Detail not found"});
    
}
export const deleteUser =async (req,res,next)=>{
    var condition_obj = req.body;
    
    var user =await UserSchemaModel.find(condition_obj);
    if(user.length!=0)
    {
       var result = await UserSchemaModel.deleteOne(condition_obj);
       if(result)
       res.status(201).json({"status":"record deleted successfully..."});
       else
       res.status(500).json({"status":"server error"});
    } 
    else
    res.status(404).json({"status":"record not found"});
}
export const updateUser =async (req,res,next)=>{
    var condition_obj =req.body.condition_obj;
   
    var user =await UserSchemaModel.findOne(condition_obj);
    if(user.length!=0)
    {
      var result =await UserSchemaModel.updateOne(condition_obj,{$set:(req.body.content_obj)})
        if(result)
            res.status(200).json({"status":"record updated successfully"});
        else
            res.status(500).json({"status":"server error"});   
    }
    else
    res.status(404).json({"status":"resource not found"});
}

