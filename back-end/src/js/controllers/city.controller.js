import { APP_CITIES_COLLECTION } from "../constants/constants.js";
import Database from "../helpers/database.helper.js";


export async function getAppCities(req, res, next) {
    try {
        const database = Database.database;
        const appCitiesCollection = database.collection(APP_CITIES_COLLECTION);
        const appCities = await appCitiesCollection.find().toArray();
        res.json(appCities);
    } catch (error) {
        console.log(error);
    }
}