"use strict";
// import { Request, Response, NextFunction } from 'express';
// // import { AuthenticatedRequest } from './authenticate';
// import Vehicle from '../model/vehicleModel'; // Assuming you have a Vehicle model
// export const getAllVehicle = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//         const user = req.user; 
//         const formData = { /* ... */ };
//         res.json(formData);
//     } catch (err) {
//         next(err);
//     }
// };
// // Retrieve vehicle information
// export const getVehicle = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//         const vehicleId = req.params.id;
//         const vehicle = await Vehicle.findById(vehicleId);
//         res.json(vehicle);
//     } catch (err) {
//         next(err);
//     }
// };
// // Create a new vehicle
// export const createVehicle = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//         const user = req.user; // Access the user data from the authenticated request
//         const vehicleData = req.body;
//         const newVehicle = new Vehicle({ ...vehicleData, owner: user._id });
//         await newVehicle.save();
//         res.status(201).json(newVehicle);
//     } catch (err) {
//         next(err);
//     }
// };
// // Update a vehicle
// export const updateVehicle = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//         const vehicleId = req.params.id;
//         const updatedVehicleData = req.body;
//         const updatedVehicle = await Vehicle.findByIdAndUpdate(vehicleId, updatedVehicleData, { new: true });
//         res.json(updatedVehicle);
//     } catch (err) {
//         next(err);
//     }
// };
// // Delete a vehicle
// export const deleteVehicle = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//         const vehicleId = req.params.id;
//         await Vehicle.findByIdAndDelete(vehicleId);
//         res.sendStatus(204); // No Content
//     } catch (err) {
//         next(err);
//     }
// };
