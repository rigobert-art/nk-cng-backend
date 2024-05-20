import express from 'express';
import { createLoan, getLoanById, getAllLoans, updateLoanById, deleteLoanById } from '../controller/loanController';

const router = express.Router();

router.post('/create', createLoan);
router.get('/get', getLoanById);
router.get('/getAll', getAllLoans);
// router.post('/set', setLoan);
router.put('/update:id', updateLoanById);
router.delete('/delete:id', deleteLoanById ) 

export default router;
