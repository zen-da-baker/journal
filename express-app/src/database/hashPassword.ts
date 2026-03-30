
/*
    This function takes in a password that was already sanitized and creates a hash. 
    The hash is salted a number of times by the environment variable for security and then 
    returned from the function ready for storage in the database.
*/
export function hashPassword( password: string ): string {

}