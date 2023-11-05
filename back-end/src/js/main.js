import { populateAllCitiesTo, populateInitialCitiesTo } from "./helpers/data.helper.js";
import Database from "./helpers/database.helper.js";
import cityRoutes from './routes/cityRoutes.js';

import express from 'express';

const port = 3001;
const app = express();

app.use(express.json());
app.use(cityRoutes);

Database.connect()
    .then(async database => {
        await populateInitialCitiesTo(database);
        await populateAllCitiesTo(database);
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
