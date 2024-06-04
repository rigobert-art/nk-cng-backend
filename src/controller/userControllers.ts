import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../model/userModel';
import { JWT_SECRET } from '../utils/jwtUtils';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, phone } = req.body;

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const existingPhone = await userModel.findOne({ phone })
        if (existingPhone){
            return res.status(401).json({ message: "Phone Number already taken"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ email, password: hashedPassword, phone });
        await newUser.save();

        res.status(201).json({ status: 200, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find the user by email and select the password field
        const user = await userModel.findOne({ email }).select('+password');

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


export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userModel.find()

        res.status(200).json({ users })
    }catch (error){
        console.error(error)
        res.status(500).json({ message: "Internal server error!"})
    }
}