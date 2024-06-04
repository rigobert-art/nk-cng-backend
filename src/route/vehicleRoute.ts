import express from 'express';
import { upload, createVehicle, getVehicles, getVehicleById, updateVehicle, deleteVehicle } from '../controllers/vehicleController';

const router = express.Router();

router.post('/vehicle', upload.single('registrationCard'), createVehicle);
router.get('/vehicle', getVehicles);
router.get('/vehicle/:id', getVehicleById);
router.put('/vehicle/:id', updateVehicle);
router.delete('/vehicle/:id', deleteVehicle);

export default router;