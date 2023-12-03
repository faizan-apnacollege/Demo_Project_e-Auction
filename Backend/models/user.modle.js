import mongoose from 'mongoose';
import UniqueValidator from 'mongoose-unique-validator';

var Userschema = mongoose.Schema({
    _id:Number,
    name:{
        type:String,
        required: [true,"Name is required"],
        lowercase: true,
        trim:true
    },
    email:{
        type:String,
        required: [true,"Email is required"],
        unique: true,
        lowercase: true,
        trim:true
    },
    mobile:{
        type:Number,
        required: [true,"Number is required"],
        minlength: 10,
        maxlength: 10,
        trim:true
    },
    password:{
        type:String,
        required: [true,"password is required"],
        minlength: 5,
        maxlength: 10,
        trim:true
    },
    address:{
        type:String,
        required: [true,"Address is required"],
        trim:true,
    },
    city:{
        type:String,
        required:[true,"City is required"],
        trim: true
    },
    gender:{
        type:String,
        required:[true,"Gender is required"],
    },
    role:String,
    status:Number,
    info:String
})

Userschema.plugin(UniqueValidator);

var UserSchemaModel = mongoose.model("user_Collection",Userschema);

export default UserSchemaModel;