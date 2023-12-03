import express from 'express';
import bodyParser from 'body-parser';

import cors from 'cors';

const app = express();

//to link routes
import UserRouter from './routes/user.router.js';
import CategoryRouter from './routes/category.router.js';
import SubCategoryRouter from './routes/subcategory.router.js';
import ProductRouter from  './routes/product.router.js';
import FileUpload from 'express-fileupload';
// import addproductRouter from './routes/addproduct.router.js';

//to accept cross origin request
app.use(cors());

//to extract body data from request (POST, PUT, DELETE, PATCH)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//to extract file data 
app.use(FileUpload());

//route level middleware
app.use("/user",UserRouter);
app.use("/category",CategoryRouter);
app.use("/subcategory",SubCategoryRouter);
app.use("/product",ProductRouter);

// app.use("/addproduct",addproductRouter)


app.listen(3002);
console.log("Server started at link http://localhost:3002");