import express from "express";
// import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer";
import cors from "cors";
import http from "http";
import SocketIO from "socket.io";
const cookieParser = require("cookie-parser");
import bodyParser from "body-parser";
import path from "path";

import userRoute from "./route/userRoute";
import superRoute from "./route/superuserRoute";
import loanRoute from "./route/loanRoute";
import formRoute from "./route/formRoute";
import guarantorRoute from "./route/guarantorRoute";
import vehicleRoute from "./route/vehicleRoute";
import Form from "./model/formModel";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
// Middleware
app.use(bodyParser.json());
app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({origin: "*"}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const io = new SocketIO.Server(server, {
	cors: {
		origin: "*",
	},
});
app.set("io", io);

// Defined root folder for testing app
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/superuser", superRoute);
app.use("/api/v1/loan", loanRoute);
// app.use('/api/v1/sms', smsRoute);
app.use("/api/v1/form", formRoute);
app.use("/api/v1/guarantor", guarantorRoute);
app.use("/api/v1/vehicle", vehicleRoute);

app.use(
	express.static(
		"/mnt/c/Users/Rigobert Kiata/Desktop/lmsVince/nk-cng-client/build"
	)
);

app.get("*", (req, res) => {
	res.sendFile("index.html", {
		root: "/mnt/c/Users/Rigobert Kiata/Desktop/lmsVince/nk-cng-client/build",
	});
});

// Error handling middleware
// app.use(
// 	(
// 		err: any,
// 		req: express.Request,
// 		res: express.Response,
// 		next: express.NextFunction
// 	) => {
// 		const statusCode = err.statusCode || 500;
// 		const message = err.message || "Internal Server Error";

// 		res.status(statusCode).json({
// 			error: {
// 				status: statusCode,
// 				message: message,
// 			},
// 		});
// 	}
// );

app.use(
	(
		err: any,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction
	) => {
		const statusCode = err.statusCode || 500;
		const message = err.message || "Internal Server Error";

		res.status(statusCode).json({
			error: {
				status: statusCode,
				message: message,
			},
		});
	}
);

// Connect to MongoDB and start server
const mongoose = require("mongoose");
const dbURi = process.env.MONGO_URI;

mongoose
	.connect(dbURi, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 5000,
		family: 4, // Keep trying to send operations for 5 seconds
	})
	.then(() => {
		server.listen(port, () => {
			console.log(`Server running on port ${port}`);
		});
	})
	.catch((error: Error) => {
		console.error("Error connecting to MongoDB:", error.message);
	});
