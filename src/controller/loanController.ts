import { Request, Response } from 'express';
import loanModel from '../model/loanModel'; // Import your Loan model
import userModel from '../model/userModel';
import mongoose from 'mongoose';
import personaModel from '../model/formModel';

// Controller function to create a new loan
export const createLoan = async (req: Request, res: Response) => {
    try {
        const { loan_reference } = await loanModel.create(req.body);

        let loan_type;
        let initial_loan_amount;
        let requirement_to_apply;

        const existingRef = await loanModel.findOne({ loan_reference });

        if (loan_reference == 2002) {
            loan_type = 'Maendeleo Bank Loan';
            initial_loan_amount = 0;
            requirement_to_apply = [
                "Original vehicle registration card",
                "Copy of NIDA Identification Card",
                "Identification letter from local government"
            ]

        }

        if (loan_reference == 2003) {
            loan_type = 'NK CNG Automotive Loan';
            initial_loan_amount = 800000;
            requirement_to_apply = [
                "Original vehicle registration card",
                "Copy of NIDA Identification Card",
                "ID letter from local government",
                "ID letter of Mdhamini from local government",
                "ID letter of Mdhamini with permanent contract",
                "Copy of NIDA of Mdhamini",
            ]
        }

        const existingType = await loanModel.findOne({ loan_reference });
        if (existingRef || existingType) {
            return res.status(409).json({ status: 409, error: 'Loan already exists' });
        }

        const newLoan = new loanModel({ loan_reference, initial_loan_amount, requirement_to_apply });
        await newLoan.save();

        return res.status(201).json({ status: 200, message: "Create loan successfully" });
    } catch (error) {
        return res.status(500).json({ status: 500, error: 'Server error' });
    }
};

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

        const updatedUser = await personaModel.findByIdAndUpdate(
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

        const updatedUser = await personaModel.findByIdAndUpdate(
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
