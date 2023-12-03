import '../models/connection.js';
import url from 'url';
import rs from 'randomstring';
import path from 'path';
import addproductSchemaModel from '../models/addproduct.model.js';


const __dirname = url.fileURLToPath(new URL('.',import.meta.url));

export var save =async (req,res,next)=>{

    var addproductList =await addproductSchemaModel.find().sort({_id:-1});
    var _id = addproductList.length==0?1:addproductList[0]._id+1;
   
    var picon = req.files.picon;
    var piconname = Date.now()+"-"+rs.generate()+"-"+caticon.name;

    var cDetails = {...req.body,"_id":_id,"piconname":piconname};


    try{
         await CategorySchemaModel.create(cDetails);
         var upload_path = path.join(__dirname,"../../UI/public/assets/uploads/producticons",piconname)
         piconname.mv(upload_path);
         res.status(201).json({"status":true});
    }
    catch(err){
        res.status(500).json({"status":false});
    }
}

// export var fetch =async (req,res,next)=>{
//     var condition_obj = url.parse(req.url,true).query
   
//     var catList =await CategorySchemaModel.find(condition_obj)
//     if(catList.length!=0)
//     res.status(200).json(catList);
//     else
//     res.status(200).json({"msg":"Record not found.."});
// }

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