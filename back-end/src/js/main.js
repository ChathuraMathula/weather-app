import { populateAllCitiesTo, populateInitialCityCodesTo } from "./helpers/data.helper.js";
import Database from "./helpers/database.helper.js";
import cityRoutes from './routes/cityRoutes.js';

import express from 'express';
import cors from 'cors';

const port = 3001;
const app = express();

var corsOptions = {
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cityRoutes);

Database.connect()
    .then(async database => {
        await populateAllCitiesTo(database);
        await populateInitialCityCodesTo(database);
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })
    })
    .catch(error => {
        console.log(error);
        console.log("Exiting process...");
        process.exit();
    });
