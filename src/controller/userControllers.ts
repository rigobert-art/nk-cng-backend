import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../model/userModel';
import { JWT_SECRET } from '../utils/jwtUtils';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ email, password: hashedPassword, name });
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

export const personalDetails = async (req: Request, res: Response) => {
    try {
        const { id, first_name, last_name, phone, address, city, country, postal_code } = req.body;

        // Check if required fields are missing
        const missingFields = [];
        if (!first_name) missingFields.push('first_name');
        if (!last_name) missingFields.push('last_name');
        if (!phone) missingFields.push('phone');
        if (!address) missingFields.push('address');
        if (!city) missingFields.push('city');
        if (!country) missingFields.push('country');
        if (!postal_code) missingFields.push('postal_code');

        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
        }

        // if (!validatePhone(phone)) {
        //     return res.status(400).json({ message: 'Invalid phone number' });
        // }

        // if (!validatePostalCode(postal_code)) {
        //     return res.status(400).json({ message: 'Invalid postal code' });
        // }

        const user = await userModel.findById(id);

        if (!user) {
            return res.status(401).json({ message: 'User does not exist' });
        }


        user.first_name = first_name;
        user.last_name = last_name;
        user.phone = phone;
        user.address = address;
        user.city = city;
        user.country = country;
        user.postal_code = postal_code;

        // Save the updated user
        await user.save();

        res.status(200).json({ message: 'Personal details saved successfully' });
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