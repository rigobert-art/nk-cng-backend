import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import http from "http";
import SocketIO from 'socket.io';
const cookieParser = require('cookie-parser');
import bodyParser from 'body-parser';

import userRoute from './route/userRoute';
import superRoute from './route/superuserRoute'; 
import loanRoute from './route/loanRoute';
import formRoute from './route/formRoute';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const fs = require("fs");

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

// upload profile picture

app.post("/upload/profile",
    bodyParser.raw({ type: ["image/jpeg", "image/png"], limit: "5mb" }),
    (req, res) => {
        try {
            console.log(req.body);
            fs.writeFile("image/jpeg", req.body, (err: any) => {
                if (err){
                    throw err;
                }
            })
            res.status(200).send({ message: "Image Uploaded successfully"})
        } catch (error) {
            console.log(error);
        }
    }
);

// sms features


//routes 
app.use('/api/v1/user', userRoute);
app.use('/api/v1/superuser', superRoute);
app.use('/api/v1/loan', loanRoute);
// app.use('/api/v1/sms', smsRoute);
app.use('/api/v1/form', formRoute);

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
