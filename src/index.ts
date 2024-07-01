import express, {Request, Response, NextFunction} from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import SocketIO from "socket.io";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import mongoose from "mongoose";

import userRoute from "./route/userRoute";
import superRoute from "./route/superuserRoute";
import loanRoute from "./route/loanRoute";
import formRoute from "./route/formRoute";
import guarantorRoute from "./route/guarantorRoute";
import vehicleRoute from "./route/vehicleRoute";

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

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/superuser", superRoute);
app.use("/api/v1/loan", loanRoute);
app.use("/api/v1/form", formRoute);
app.use("/api/v1/guarantor", guarantorRoute);
app.use("/api/v1/vehicle", vehicleRoute);

app.use(express.static("/dist"));

app.get("*", (req, res) => {
	res.sendFile("index.html", {
		root: "/dist/public",
	});
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";

	res.status(statusCode).json({
		error: {
			status: statusCode,
			message: message,
		},
	});
});

// Connect to MongoDB and start server
const dbURI = process.env.MONGO_URI as string;

mongoose
	.connect(dbURI, {
		serverSelectionTimeoutMS: 5000,
		socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
		family: 4, // Use IPv4, skip trying IPv6
	})
	.then(() => {
		server.listen(port, () => {
			console.log(`Server running on port ${port}`);
		});
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error.message);
	});
