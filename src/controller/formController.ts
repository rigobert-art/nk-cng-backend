// controllers/formController.ts
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Form from '../model/formModel';
import User from '../model/userModel';
import Image from "../model/ImageModel";
import Loan from "../model/loanModel";


import multer from 'multer';

const user_upload = multer({ dest: 'user_id/' });
const guarantor_upload = multer({ dest: ''})

export const createUserForm = async (req: Request, res: Response) => {
    try {
        const {
            userId,
            firstName,
            lastName,
            phone,
            nationalId,
            ward,
            city,
            postalCode,
            email,
            loanType,
        } = req.body;

        const { frontId, backId } = req.files as { [fieldname: string]: Express.Multer.File[] };

        // Validate required fields
        if (!firstName || !lastName || !phone || !postalCode || !email) {
            return res.status(400).json({ message: 'Please fill all the required fields' });
        }

        // Validate user ID
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Check if image files are uploaded
        if (!frontId || !backId) {
            return res.status(400).json({ message: 'Front and back ID images are required' });
        }

        // Create new form
        const newForm = new Form({
            user_id: userId,
            first_name: firstName,
            last_name: lastName,
            phone,
            national_id: nationalId,
            loanType: loanType,
            address: {
                ward,
                city,
                postal_code: postalCode,
            },
            email,
            front_id_image_path: frontId[0].path, // assuming single file uploads
            back_id_image_path: backId[0].path,   // assuming single file uploads
        });

        await newForm.save();

        res.status(201).json({ status: 201, message: 'Form Submitted Successfully' });
    } catch (error) {
        console.error('Error creating form:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Apply multer middleware to handle file uploads
export const upload_user_middleware = user_upload.fields([
    { name: 'frontId', maxCount: 1 },
    { name: 'backId', maxCount: 1 },
]);


export const upload_guarantor_middleware = user_upload.fields([
    { name: 'frontId', maxCount: 1 },
    { name: 'backId', maxCount: 1 },
    { name: 'barua', maxCount: 1 }
]);




const 

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


export const uploadPicture = async (req: Request, res: Response) => {
    try {
        const { formId, imageType } = req.body;

        if (!formId || !imageType) {
            return res.status(400).send('User ID and image type are required.');
        }

        if (!mongoose.Types.ObjectId.isValid(formId)) {
            return res.status(400).json({ message: 'Invalid form ID' });
        }

        if (!req.file){
            return res.status(400).json({ message: 'No file uploaded' });
        }

       

        const newImage = new Image({
            Form: formId,
            imageType,
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            data: req.file.buffer
        });

        await newImage.save();
        res.status(201).send('Image uploaded successfully.');
       
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getUserImage = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        const images = await Image.find({ User: userId });
        res.status(200).json(images);
    } catch (error) {
        console.error('Error getting images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const updateLoanType = async (req: Request, res: Response) => {
    try{
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
    catch(error){
        console.error('Error getting images:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}