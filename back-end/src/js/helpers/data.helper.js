import fs from 'fs';
import path from 'path';
import { ALL_APP_CITIES_COLLECTION, APP_CITIES_COLLECTION } from '../constants/constants.js';


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

export async function populateInitialCitiesTo(database) {

    const collectionName = APP_CITIES_COLLECTION;
    const isExistAppCitiesCollection = await isExistCollection(database, collectionName)

    if (isExistAppCitiesCollection) {
        console.log("cities.json is already populated in database.")
        return;
    }

    try {
        const collection = database.collection(collectionName);
        const data = JSON.parse(fs.readFileSync(path.join("src/json/cities.json")), 'utf8');
        const result = await collection.insertMany(data.List);
        console.log(`${result.insertedCount} documents inserted`);
    } catch (error) {
        console.log("Error populating initial app cities to database", error)
    }
}