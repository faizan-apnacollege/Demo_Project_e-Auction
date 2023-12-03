import mongoose from 'mongoose';
var url = "mongodb://127.0.0.1:27017/eAuction_MERN56";
mongoose.connect(url);
console.log("DataBase connected successfully....");  