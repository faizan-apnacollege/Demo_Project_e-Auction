import '../models/connection.js';
import url from 'url';
import rs from 'randomstring';
import path from 'path';
import ProductSchemaModel from '../models/product.model.js';


const __dirname = url.fileURLToPath(new URL('.',import.meta.url));

export var save =async (req,res,next)=>{

    var pList =await ProductSchemaModel.find().sort({_id:-1});
    var _id = pList.length==0?1:pList[0]._id+1;
   
    var picon = req.files.picon;
    var piconname = Date.now()+"-"+rs.generate()+"-"+picon.name;

    var pDetails = {...req.body,"_id":_id,"piconname":piconname, "info":Date.now()};


    try{
         await ProductSchemaModel.create(pDetails);
         var upload_path = path.join(__dirname,"../../UI/public/assets/uploads/producticons",piconname)
         picon.mv(upload_path);
         res.status(201).json({"status":true});
    }
    catch(err){
        res.status(500).json({"status":false});
    }
}

 export var fetch =async (req,res,next)=>{
    var condition_obj = url.parse(req.url,true).query
   
    var pList =await ProductSchemaModel.find(condition_obj)
    if(pList.length!=0)
    res.status(200).json(pList);
    else
    res.status(200).json({"msg":"Record not found.."});
}

// export var deleteProduct =async (req,res,next)=>{
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

// export var updateProduct = async(req,res,next)=>{
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