import { MongoClient } from "mongodb";

// Import data models 
import { Token } from "../client/models/Token.js";
import { User } from "../controllers/server-models/User.js";

// Import environment parsing from Node
import { env } from "node:process";

export async function saveUserAccount( user: User ): Promise<boolean> {

    try {

        let client = new MongoClient( env.URI );

        await client.connect();

        let dbName = env.DB_NAME;

        let db = client.db( dbName );

        let collection = db.collection("users");

        collection.updateOne( { username: user.username }, { $set: user }, { upsert: true} );

        await client.close();

        return true;

    } catch( error: any ) {

        console.log( error );

        return false;

    }

}