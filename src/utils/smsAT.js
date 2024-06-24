"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var africastalking_1 = __importDefault(require("africastalking"));
var at = (0, africastalking_1.default)({
    apiKey: '8ee049d80e558be1680fddf90fd4683e016d9ef98be04fbbc6e2e6f41f869cee',
    username: 'MIKE001'
});
var sms = at.SMS;
var phoneNumber = "+255755481857"; // Assuming the user model has a phoneNumber field
var message = "Dear Enock Samuel, your loan has been approved.";
var options = {
    to: phoneNumber,
    message: message,
    from: ""
};
sms.send(options)
    .then(function (response) {
    console.log('SMS sent successfully:', response);
})
    .catch(function (error) {
    console.error('Error sending SMS:', error);
});
