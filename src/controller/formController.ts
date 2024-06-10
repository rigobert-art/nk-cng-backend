// controllers/formController.ts
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Form from '../model/formModel';
import User from '../model/userModel';
import Loan from "../model/loanModel";

import multer from 'multer';

export const uploadMiddleware = multer({ dest: 'user_id/' });

export const personalForm = async (req: Request, res: Response) => {
    try {
        const {
            formId,
            firstName,
            lastName,
            phone,
            nationalId,
            ward,
            city,
            postalCode,
            cylinderSize,
            email,
            loanType,
        } = req.body;

        const form = await Form.findById(formId)
        if (!form) {
            res.status(200).json({ message: "Form was not found! " })
        }

        const updatedForm = await Form.findOneAndUpdate({
            first_name: firstName,
            last_name: lastName,
            phone,
            national_id: nationalId,
            loanType: loanType,
            cylinderSize: cylinderSize,
            address: {
                ward,
                city,
                postal_code: postalCode,
            },
            email,
            status: "submitted"
        }, { _id: formId })
        console.log(updatedForm)


        res.status(201).json(updateForm);
    } catch (error) {
        console.error('Error creating form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const handleImageUpload = async (req: Request, res: Response) => {
    try {
        const { formId } = req.body;

        console.log('Form ID:', formId);
        console.log('Files:', req.files);

        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ message: "Form not found!" });
        }

        // Check if image files are uploaded 
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        if (!files || !files.frontId || !files.backId) {
            return res.status(400).json({ message: 'Front and back ID images are required' });
        }

        console.log('Front ID Image:', files.frontId[0].path);
        console.log('Back ID Image:', files.backId[0].path);

        // Update the form with image paths
        await Form.findByIdAndUpdate(formId, {
            front_id_image: files.frontId[0].path,
            back_id_image: files.backId[0].path,
        });

        res.status(200).json({ status: "Ok", message: 'Images Uploaded Successfully' });
    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Apply multer middleware to handle file uploads
export const upload_user_middleware = uploadMiddleware.fields([
    { name: 'frontId', maxCount: 1 },
    { name: 'backId', maxCount: 1 },
]);


export const getForms = async (req: Request, res: Response) => {
    try {
        const forms = await Form.find().sort({ createdAt: -1 });
        res.status(200).json(forms);
    } catch (error) {
        console.error('Error retrieving forms:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getFormById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Validate form ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid form ID' });
        }

        const form = await Form.findById(id).populate('user').populate('passport');

        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }

        res.status(200).json(form);
    } catch (error) {
        console.error('Error retrieving form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateForm = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Validate form ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid form ID' });
        }

        const updatedForm = await Form.findByIdAndUpdate(id, updateData, { new: true }).populate('user').populate('passport');

        if (!updatedForm) {
            return res.status(404).json({ message: 'Form not found' });
        }

        res.status(200).json(updatedForm);
    } catch (error) {
        console.error('Error updating form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteForm = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Validate form ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid form ID' });
        }

        const deletedForm = await Form.findByIdAndDelete(id);

        if (!deletedForm) {
            return res.status(404).json({ message: 'Form not found' });
        }

        res.status(200).json({ message: 'Form deleted successfully' });
    } catch (error) {
        console.error('Error deleting form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const updateLoanType = async (req: Request, res: Response) => {
    try {
        const { userId, loanType } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!loanType) {
            return res.status(400).json({ message: 'Loan type is required' });
        }

        const newForm = new Form({
            User: userId,
        })
        newForm.save()

        const newLoan = new Loan({
            Form: newForm._id,
            loan_type: loanType,
        })

        newLoan.save()

    }
    catch (error) {
        console.error('Error getting images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const acceptLoanTerms = async (req: Request, res: Response) => {
    const { accepted, userId } = req.body;

    try {

        // check if user has a form id
        const checkForm = await Form.findOne({ User: userId });
        if (checkForm) {
            return res.status(202).json({ status: "Ok", message: 'User has form' });
        }

        const newForm = new Form({
            agreed_terms: accepted,
            User: userId,
        });

        const saved = await newForm.save();

        res.status(200).json({ status: "Ok", formId: `${saved._id}`, message: " Successful created form!" })
    } catch (error) {
        console.error('Error getting images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

export const checkLoanStatus = async (req: Request, res: Response) => {
    const { formId } = req.body;

    try {
        const checkStatus = Form.find({ _id: formId, agreed_terms: true })
        if (!checkStatus) {
            return res.status(400).json({ message: "Terms not agreed" })
        }
    } catch (error) {
        console.error('Error getting images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}