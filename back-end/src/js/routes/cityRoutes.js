import express from 'express';

import { addCity, getAppCities, removeCity } from '../controllers/city.controller.js';

const router = express.Router();

router.get("/api/app/cities", getAppCities);

router.post("/api/app/city", addCity);

router.delete("/api/app/city", removeCity);

export default router;