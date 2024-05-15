"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const cookieParser = require('cookie-parser');
const body_parser_1 = __importDefault(require("body-parser"));
const userRoute_1 = __importDefault(require("./route/userRoute"));
const superuserRoute_1 = __importDefault(require("./route/superuserRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
// Middleware
app.use(body_parser_1.default.json());
app.disable("x-powered-by");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: '*' }));
app.use(cookieParser());
const server = http_1.default.createServer(app);
const io = new socket_io_1.default.Server(server, {
    cors: {
        origin: '*',
    },
});
app.set("io", io);
// Healthcheck endpoint
app.get('/', (req, res) => {
    res.status(200).send({ status: 'ok' });
});
//routes 
app.use('/api/v1/user', userRoute_1.default);
app.use('/api/v1/superuser', superuserRoute_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
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
mongoose_1.default.connect(process.env.MONGO_URI || "", {
    family: 4,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
})
    .then(() => {
    app.listen(4000, "0.0.0.0", () => {
        console.log(`Server running on port ${port}`);
    });
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
