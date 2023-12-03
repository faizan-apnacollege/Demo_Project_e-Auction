import express from 'express';
import * as ProductController from '../controller/product.controller.js';

const router = express.Router();

router.post("/save",ProductController.save);

 router.get("/fetch",ProductController.fetch);

// router.delete("/delete",ProductController.deleteProduct);

// router.patch("/update",ProductController.updateProduct);

export default router;