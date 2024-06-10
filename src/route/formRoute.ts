import express from 'express';
import { personalForm, getForms, getFormById, acceptLoanTerms, handleImageUpload } from '../controller/formController';
import { uploadMiddleware } from '../middlewares/storage'

const router = express.Router();

router.post('/personal', personalForm );
router.post('/personal/upload', 
    uploadMiddleware.fields([
        { name: 'frontId', maxCount: 1 },
        { name: 'backId', maxCount: 1 },
]), handleImageUpload)
router.get('/getAll', getForms);
router.get('/getById/:id', getFormById);
router.post("/accept-terms", acceptLoanTerms)
// router.get('/user/:userId', getUserImage);


export default router;
