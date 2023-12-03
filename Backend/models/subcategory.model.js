import mongoose  from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
var SubCategorySchema = mongoose.Schema({
    _id:Number,
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
        trim:true,
        unique:true
    },
    subcaticonname:{
        type:String,
        required:[true,"Sub category  icon is required"],
        unique: true,
        trim:true
    }
});
//Apply the uniquiValidator plugin to CategorySchema
SubCategorySchema.plugin(uniqueValidator);

//compile schema to model
const SubCategorySchemaModel = mongoose.model('subcategory_collection',SubCategorySchema);
 
export default SubCategorySchemaModel;