import express from 'express';
import { createUserForm, getForms, getFormById, uploadPicture, getUserImage, uploadMiddleware } from '../controller/formController';
import { upload } from '../middlewares/storage'

const router = express.Router();

router.post('/personal_details', uploadMiddleware, createUserForm );
router.get('/getAll', getForms);
router.get('/getById/:id', getFormById);
router.get('/user/:userId', getUserImage);


export default router;
