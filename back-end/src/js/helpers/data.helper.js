import fs from 'fs';
import path from 'path';
import { ALL_APP_CITIES_COLLECTION, APP_CITIES_COLLECTION, CITY_CODES_COLLECTION } from '../constants/constants.js';


async function isExistCollection(database, collectionName) {
    const collections = await database.listCollections().toArray();

    const collectionExists = collections.some(collection => collection.name === collectionName);
    return collectionExists;
}

export async function populateAllCitiesTo(database) {
    const collectionName = ALL_APP_CITIES_COLLECTION;
    const isExistAllAppCitiesCollection = await isExistCollection(database, collectionName)

    if (isExistAllAppCitiesCollection) {
        console.log("city.list.json is already populated in database.")
        return;
    }

    try {
        const collection = database.collection(collectionName);
        const data = JSON.parse(fs.readFileSync(path.join("src/json/city.list.json")), 'utf8');
        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents inserted`);
    } catch (error) {
        console.log("Error populating all app cities to database", error)
    }
}

export async function populateInitialCityCodesTo(database) {

    const collectionName = CITY_CODES_COLLECTION;
    const hasAppCitiesCollection = await isExistCollection(database, collectionName)

    if (hasAppCitiesCollection) {
        console.log("city codes from cities.json is already populated in database.")
        return;
    }

    try {
        const collection = database.collection(collectionName);
        const data = JSON.parse(fs.readFileSync(path.join("src/json/cities.json")), 'utf8');
        const cityCodes = data.List.map((city, i) => city.CityCode);
        console.log(cityCodes)
        const body = {
            list: cityCodes
        }
        await collection.insertOne(body);
        console.log(`city codes document inserted`);
    } catch (error) {
        console.log("Error populating initial app city codes to database", error)
    }
}