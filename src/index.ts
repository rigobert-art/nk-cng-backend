import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import multer from 'multer';
import cors from 'cors';
import http from "http";
import SocketIO from 'socket.io';
const cookieParser = require('cookie-parser');
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

import userRoute from './route/userRoute';
import superRoute from './route/superuserRoute'; 
import loanRoute from './route/loanRoute';
import formRoute from './route/formRoute';
import guarantorRoute from './route/guarantorRoute';
import vehicleRoute from './route/vehicleRoute';

import Image from './model/ImageModel';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.disable("x-powered-by")
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: '*' }))
app.use(cookieParser())

const server = http.createServer(app);
const io = new SocketIO.Server(server, {
    cors: {
        origin: '*',
    },
});
app.set("io", io);

// Healthcheck endpoint
app.get('/', (req, res) => {
  res.status(200).send({ status: 'ok' });
});

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/api/v1/image/upload', upload.single('file'), async (req, res) => {
    const { formId, imageType } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        const newImage = new Image({
            formId,
            imageType,
            filename: req.file.originalname,
            contentType: req.file.mimetype,
            data: req.file.buffer
        });

        await newImage.save();
        res.status(200).json(newImage);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error', error });
    }
});

// sms features


//routes 
app.use('/api/v1/user', userRoute);
app.use('/api/v1/superuser', superRoute);
app.use('/api/v1/loan', loanRoute);
// app.use('/api/v1/sms', smsRoute);
app.use('/api/v1/form', formRoute);
app.use('/api/v1/form', guarantorRoute);
app.use('/api/v1/vehicle', vehicleRoute)

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: {
            status: statusCode,
            message: message,
        },
    });
});



// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI || "", {
    family: 4,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
})
    .then(() => {
        app.listen(4000, "0.0.0.0", () => {
            
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error: any) => {
        console.error('Error connecting to MongoDB:', error);
    });
