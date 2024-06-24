"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import mongoose from "mongoose";
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const cookieParser = require("cookie-parser");
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const userRoute_1 = __importDefault(require("./route/userRoute"));
const superuserRoute_1 = __importDefault(require("./route/superuserRoute"));
const loanRoute_1 = __importDefault(require("./route/loanRoute"));
const formRoute_1 = __importDefault(require("./route/formRoute"));
const guarantorRoute_1 = __importDefault(require("./route/guarantorRoute"));
const vehicleRoute_1 = __importDefault(require("./route/vehicleRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
// Middleware
app.use(body_parser_1.default.json());
app.disable("x-powered-by");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
app.use(cookieParser());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
const server = http_1.default.createServer(app);
const io = new socket_io_1.default.Server(server, {
    cors: {
        origin: "*",
    },
});
app.set("io", io);
// Defined root folder for testing app
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "public", "index.html"));
});
//routes
app.use("/api/v1/user", userRoute_1.default);
app.use("/api/v1/superuser", superuserRoute_1.default);
app.use("/api/v1/loan", loanRoute_1.default);
// app.use('/api/v1/sms', smsRoute);
app.use("/api/v1/form", formRoute_1.default);
app.use("/api/v1/guarantor", guarantorRoute_1.default);
app.use("/api/v1/vehicle", vehicleRoute_1.default);
app.use(express_1.default.static("/mnt/c/Users/Rigobert Kiata/Desktop/lmsVince/nk-cng-client/build"));
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
app.use((err, req, res, next) => {
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
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
});
