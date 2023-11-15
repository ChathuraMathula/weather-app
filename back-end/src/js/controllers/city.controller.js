import { ALL_APP_CITIES_COLLECTION, APP_CITIES_COLLECTION, CITY_CODES_COLLECTION } from "../constants/constants.js";
import Database from "../helpers/database.helper.js";


export async function getAppCitiesByCityCodes(req, res, next) {
    try {
        const database = Database.database;
        const cityCodesCollection = database.collection(CITY_CODES_COLLECTION);
        const cityCodes = await cityCodesCollection.findOne();
        res.json(cityCodes);
    } catch (error) {
        console.log(error);
    }
}

export async function getCitiesByCityName(req, res, next) {
    try {
        const { cityName, countryName } = req.body;

        console.log(req.body, cityName.length <= 1);

        if (!cityName || cityName.length <= 1) {
            return res.json({ error: "No such data can be found." });
        }

        const database = Database.database;
        const appCitiesCollection = database.collection(ALL_APP_CITIES_COLLECTION);

        const cityNameRegExPattern = new RegExp(`^${cityName.trim()}`, 'i');
        const query = {
            name: { $regex: cityNameRegExPattern }
        };

        if (countryName) {
            const countryRegExPattern = new RegExp(`^${countryName.trim()}`, 'i');
            query.country = { $regex: countryRegExPattern }
        }

        const options = {
            projection: {
                _id: 0, id: 1, name: 1, country: 1, state: 1,
            }
        };
        const appCities = await appCitiesCollection.find(query, options).toArray();
        res.json(appCities);
    } catch (error) {
        console.log(error);
    }
}

export async function addCityByCityCode(req, res, next) {
    try {
        const { cityName, countryName } = req.body;

        const database = Database.database;
        const allAppCitiesCollection = database.collection(ALL_APP_CITIES_COLLECTION);

        const queryAllCities = { name: cityName, country: countryName };
        const options = {
            projection: {
                _id: 0, id: 1, name: 1, country: 1,
            }
        };

        const city = await allAppCitiesCollection.findOne(queryAllCities, options);

        if (!city) {
            res.json({ error: "invalid city name or country name" })
            return;
        }

        const cityCodesCollection = database.collection(CITY_CODES_COLLECTION);

        await cityCodesCollection.updateOne(
            {},
            { $addToSet: { list: city.id.toString() } },
            (updateErr, result) => {
                if (updateErr) {
                    console.error('Error updating document:', updateErr);
                    return;
                }

                console.log('Document updated successfully');
                console.log('Modified', result.modifiedCount, 'document(s)');
            }
        );


        await getAppCitiesByCityCodes(req, res, next);
    } catch (error) {
        console.log(error);
    }
}

export async function removeCityByCityCode(req, res, next) {
    try {
        const { cityCode } = req.body;

        const database = Database.database;
        const cityCodesCollection = database.collection(CITY_CODES_COLLECTION);

        await cityCodesCollection.updateOne(
            {},
            { $pull: { list: cityCode.toString() } },
            (updateErr, result) => {
                if (updateErr) {
                    console.error('Error updating document:', updateErr);
                    return;
                }

                console.log('Document updated successfully');
                console.log('Modified', result.modifiedCount, 'document(s)');
            }
        );


        await getAppCitiesByCityCodes(req, res, next);
    } catch (error) {
        console.log(error);
    }
}