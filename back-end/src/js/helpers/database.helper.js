import { MongoClient } from "mongodb"
import { MONGO_CONNECTION_URL, MONGO_DATABASE_NAME } from "../constants/constants.js";


export default class Database {

    static #database;
    static #client;

    static async connect() {

        if (this.#database) {
            return this.#database;
        }

        try {
            this.#client = await new MongoClient(MONGO_CONNECTION_URL).connect();
            this.#database = this.#client.db(MONGO_DATABASE_NAME);
            console.log("Connected to MonogDB");
            return this.#database;
        } catch (error) {
            console.log("Error connecting to MongoDB: ", error);
            throw error;
        }
    }

    static get database() {

        if (!this.#database) {
            throw new Error("Database connection has not been established")
        }

        return this.#database;
    }
}

