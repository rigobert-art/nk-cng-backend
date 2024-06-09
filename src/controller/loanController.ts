import { Request, Response } from 'express';
import loanModel from '../model/loanModel'; // Import your Loan model
import User from '../model/userModel';
import mongoose from 'mongoose';
import Form from '../model/formModel';
import Loan from '../model/loanModel'

import africastalking from 'africastalking';
import formModel from '../model/formModel';

// Initialize Africa's Talking with your API key and username
const at = africastalking({
    apiKey: 'YOUR_API_KEY',
    username: 'YOUR_USERNAME'
});

const sms = at.SMS;

// Controller function to get all loans
export const getAllLoans = async (req: Request, res: Response) => {
    try {
        const loans = await loanModel.find();
        return res.status(200).json(loans);
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

// // Controller function to get a loan by ID
export const getLoanById = async (req: Request, res: Response) => {
    try {
        const loan = await loanModel.findById(req.params.id);
        if (!loan) {
            return res.status(404).json({ error: 'Loan not found' });
        }
        return res.status(200).json(loan);
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

export const approveLoan = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const updatedUser = await Form.findByIdAndUpdate(
            userId,
            {
                is_approved: true,
                approved_date: new Date()
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const phoneNumber = updatedUser.phone; // Assuming the user model has a phoneNumber field
        const message = `Dear ${updatedUser.first_name} ${updatedUser.last_name}, your loan has been approved.`;

        const options = {
            to: "",
            message: message,
            from: "" 
        };

        sms.send(options)
            .then((response: any) => {
                console.log('SMS sent successfully:', response);
            })
            .catch((error: any) => {
                console.error('Error sending SMS:', error);
            });


        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// // Controller function to update a loan by ID
export const updateLoanById = async (req: Request, res: Response) => {
    try {
        const loan = await loanModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!loan) {
            return res.status(404).json({ error: 'Loan not found' });
        }
        return res.status(200).json(loan);
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

// // Controller function to delete a loan by ID
export const deleteLoanById = async (req: Request, res: Response) => {
    try {
        const loan = await loanModel.findByIdAndDelete(req.params.id);
        if (!loan) {
            return res.status(404).json({ error: 'Loan not found' });
        }
        return res.status(200).json({ message: 'Loan deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};

export const updateLoanTypeAndInitialAmount = async (req: Request, res: Response) => {
    try {
        const { userId, initial_amount } = req.body;

        const updatedUser = await formModel.findByIdAndUpdate(
            userId,
            {
                is_loan_type: true,
                is_initial_paid: true,
                initial_amount
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
