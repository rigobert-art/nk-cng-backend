import express from 'express';
import { createForm } from '../controller/formController';

const router = express.Router();

router.post('/create', createForm );


export default router;
