// Import packages
import { MongoClient } from "mongodb";

import { env } from "node:process";

export async function establishDatabaseConnection(): Promise<any> {

    // Establishing the MongoDB client
    const databaseClient = new MongoClient( env.URI );

    // The database is connected
    databaseClient.connect();

    const database = databaseClient.db( env.DB_NAME );

    // The database connection is returned
    return database;

}