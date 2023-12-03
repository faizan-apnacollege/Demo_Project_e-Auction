import '../models/connection.js';
import url from 'url';
import rs from 'randomstring';
import path from 'path';
import SubCategorySchemaModel from '../models/subcategory.model.js';
import { now } from 'mongoose';

const __dirname = url.fileURLToPath(new URL('.',import.meta.url));

export var save =async (req,res,next)=>{
    // console.log(req.body);
 
    var scList =await SubCategorySchemaModel.find().sort({_id:-1});
    var _id = scList.length==0?1:scList[0]._id+1;
   
    var subcaticon = req.files.subcaticon;
    var subcaticonname = Date.now()+"-"+rs.generate()+"-"+subcaticon.name;

    var scDetails = {...req.body,"_id":_id,"subcaticonname":subcaticonname};


    try{
         await SubCategorySchemaModel.create(scDetails);
         var upload_path = path.join(__dirname,"../../UI/public/assets/uploads/subcategoryicons",subcaticonname)
         subcaticon.mv(upload_path);
         res.status(201).json({"status":true});
    }
    catch(err){
        res.status(500).json({"status":false});
    }
}

export var fetch =async (req,res,next)=>{
    var condition_obj = url.parse(req.url,true).query
   
    var scatList =await SubCategorySchemaModel.find(condition_obj)
    // console.log(scatList);
    if(scatList.length!=0)
    res.status(200).json(scatList);
    else
    res.status(500).json([{"msg":"Record not found.."}]);
}

// export var deleteCategory =async (req,res,next)=>{
//     var condition_obj = JSON.parse(req.body.condition_obj);
//     var catList =await CategorySchemaModel.find(condition_obj);
//     if(catList.length!=0)
//     {
//       var dlt =await CategorySchemaModel.deleteMany(condition_obj);
//       if(dlt)
//       res.status(200).json({"status":"deleted successfully..."});
//       else
//       res.status(500).json({"msg":"server error"});
//     }
//     else
//     res.status(404).json({"msg":"resource not found.."});
// }

// export var updateCategory = async(req,res,next)=>{
//     var condition_obj = JSON.parse(req.body.condition_obj)
//     var catList = await CategorySchemaModel.findOne(condition_obj);
   
//     if(catList)
//     {
//         var result =  await CategorySchemaModel.updateMany(condition_obj,{$set:JSON.parse(req.body.content_obj)})
//         if(result)
//         res.status(200).json({"status":"resource updated successfully"});
//         else
//         res.status(500).json({"status":"server error......."});
//     }
//     else
//     res.status(404).json({"msg":"resource not  found..."});
    
// }