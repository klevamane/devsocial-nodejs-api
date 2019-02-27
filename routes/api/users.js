import express from 'express';
import  UserController from '../../controller/user';

let router = express.Router();

router.post('/test', UserController.registerUser)

export default router;
