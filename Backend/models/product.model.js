import mongoose  from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
var ProductSchema = mongoose.Schema({
    _id:Number,
    ptitle:{
        type:String,
        required:[true,"product name is  required"],
        lowercase:true,
        trim:true
    },
    catname:{
        type:String,
        required:[true,"Category name is  required"],
        lowercase:true,
        trim:true
    },
    subcatname:{
        type:String,
        required:[true,"Sub Category name is  required"],
        lowercase:true,
        trim:true
    },
    pdescription:{
        type:String,
        required:[true,"Product Description is  required"],
        lowercase:true,
        trim:true
    },
    pbaseprice:{
        type:String,
        required:[true,"Product Base Price is  required"],
        lowercase:true,
        trim:true
    },
    piconname:{
        type:String,
        required:[true,"Product icon is required"],
        unique: true,
        trim:true
    },
    info:String
});
//Apply the uniquiValidator plugin to CategorySchema
ProductSchema.plugin(uniqueValidator);

//compile schema to model
const ProductSchemaModel = mongoose.model('product_collection',ProductSchema);
 
export default ProductSchemaModel;