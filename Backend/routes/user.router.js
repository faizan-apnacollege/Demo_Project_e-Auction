import express from 'express';
import * as Controller from '../controller/user.controller.js';

const router = express.Router();


router.post("/save",Controller.save);

router.get("/fetch",Controller.fetch);

router.delete("/delete",Controller.deleteUser);

router.patch("/update",Controller.updateUser);

router.post("/login",Controller.login);


export default router;