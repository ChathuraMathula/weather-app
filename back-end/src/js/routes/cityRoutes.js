import express from 'express';

import { getAppCities } from '../controllers/city.controller.js';

const router = express.Router();

router.get("/api/app/cities", getAppCities);

export default router;