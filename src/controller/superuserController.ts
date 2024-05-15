import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import superUser from '../model/superuserModel';
import { JWT_SECRET } from '../utils/jwtUtils';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

        // Check if the user already exists
        const existingUser = await superUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new superUser({ email, password: hashedPassword, name });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find the user by email and select the password field
        const user = await superUser.findOne({ email }).select('+password');

        // If no user is found, return an error
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        const isPasswordValid = await bcrypt.compare(password as string, user.password as string);


        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

        const { password: _, ...userWithoutPassword } = user.toObject();

        res.json({ token, user: userWithoutPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};