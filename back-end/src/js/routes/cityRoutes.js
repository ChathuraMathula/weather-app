import express from 'express';

import { addCityByCityCode, getAppCitiesByCityCodes, getCitiesByCityName, removeCityByCityCode } from '../controllers/city.controller.js';

const router = express.Router();

router.post("/api/cities", getCitiesByCityName);

router.get("/api/app/cities", getAppCitiesByCityCodes);

router.post("/api/app/city", addCityByCityCode);

router.delete("/api/app/city", removeCityByCityCode);

export default router;