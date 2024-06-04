import express from 'express';
import {register, login, getUsers} from '../controller/userControllers';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.post('/register', register);
router.post('/login', login );
router.get('/logout', authenticate, (req, res) => {
    // Clear the token or do any other logout operations
    res.json({ message: 'Logged out successfully' });
});
router.get('/users', getUsers);

export default router;