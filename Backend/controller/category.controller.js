import '../models/connection.js';
import url from 'url';
import rs from 'randomstring';
import path from 'path';
import CategorySchemaModel from '../models/category.model.js';
import { now } from 'mongoose';

const __dirname = url.fileURLToPath(new URL('.',import.meta.url));

export var save =async (req,res,next)=>{

    var cList =await CategorySchemaModel.find().sort({_id:-1});
    var _id = cList.length==0?1:cList[0]._id+1;
   
    var caticon = req.files.caticon;
    var caticonname = Date.now()+"-"+rs.generate()+"-"+caticon.name;

    var cDetails = {...req.body,"_id":_id,"caticonname":caticonname};

    console.log(cDetails)
    try{
         var upload_path = path.join(__dirname,"../../UI/public/assets/uploads/categoryicon",caticonname)
         caticon.mv(upload_path);
         await CategorySchemaModel.create(cDetails);
         res.status(201).json({"status":true});
    }
    catch(err){
        res.status(500).json({"status":false});
    }
}

export var fetch =async (req,res,next)=>{
    var condition_obj = url.parse(req.url,true).query
   
    var catList =await CategorySchemaModel.find(condition_obj)
    if(catList.length!=0)
    res.status(200).json(catList);
    else
    res.status(200).json({"msg":"Record not found.."});
}

export var deleteCategory =async (req,res,next)=>{
    var condition_obj = (req.body);
    var catList =await CategorySchemaModel.find(condition_obj);
    // console.log(catList);
    if(catList.length!=0)
    {
      var dlt =await CategorySchemaModel.deleteOne(condition_obj);
      if(dlt)
      res.status(200).json({"status":"deleted successfully..."});
      else
      res.status(500).json({"msg":"server error"});
    }
    else
    res.status(404).json({"msg":"resource not found.."});
}

export var updateCategory = async(req,res,next)=>{
    var condition_obj = JSON.parse(req.body.condition_obj)
    var catList = await CategorySchemaModel.findOne(condition_obj);
   
    if(catList)
    {
        var result =  await CategorySchemaModel.updateMany(condition_obj,{$set:JSON.parse(req.body.content_obj)})
        if(result)
        res.status(200).json({"status":"resource updated successfully"});
        else
        res.status(500).json({"status":"server error......."});
    }
    else
    res.status(404).json({"msg":"resource not  found..."});
    
}