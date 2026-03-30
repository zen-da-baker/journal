// Import bcrypt for password hashing
import bcrypt from "bcrypt";

// Import environment
import { env } from "node:process";

/*
    This function takes in a password that was already sanitized and creates a hash. 
    The hash is salted a number of times by the environment variable for security and then 
    returned from the function ready for storage in the database.
*/
export async function hashPassword( password: string ): Promise<string> {

    const saltRounds = Number( env.SALT_ROUNDS );

    let hashedPassword = await bcrypt.hash( password, saltRounds );

    return hashedPassword;

}