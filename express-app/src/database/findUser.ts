// Import database
import { database } from "../server.js";

// Import data models
import { User } from "../controllers/server-models/User.js";

export async function findUser( username: string ): Promise<User | null> {

    let collection = database.collection("users");

    let user: User | null = collection.findOne({ username: username });

    return user;

}