import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import superUser from '../model/officerModel';
import { JWT_SECRET } from '../utils/jwtUtils';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body;

        // Check if the user already exists
        const existingUser = await superUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const existingUsername = await superUser.findOne({ username });
        if (existingUsername) {
            return res.status(401).json({ message: 'Username already taken!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new superUser({ email, password: hashedPassword, username });
        await newUser.save();

        res.status(201).json({ status: 200, message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { auth, password } = req.body;

        // Find the user by email or username and select the password field
        const user = await superUser.findOne({
            $or: [{ email : auth }, { username: auth }]
        }).select('+password');

        // If no user is found, return an error
        if (!user) {
            return res.status(401).json({ status: 401, message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ status: 401, message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });

        // Exclude the password from the user object before sending the response
        const { password: _, ...userWithoutPassword } = user.toObject();

        res.json({ token, user: userWithoutPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
};