import express from 'express';
import { createForm, getForms, getFormById, uploadPicture, getUserImage } from '../controller/formController';
import { upload } from '../middlewares/storage'

const router = express.Router();

router.post('/create', createForm );
router.get('/getAll', getForms);
router.get('/getById/:id', getFormById);
router.post('/upload', upload.single('image'), uploadPicture );
router.get('/user/:userId', getUserImage);


export default router;
