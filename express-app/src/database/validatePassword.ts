// Import bcrypt package
import bcrypt from "bcrypt";

export async function validatePassword( plainPassword: string, hashedPassword: string ): Promise<boolean> {

    let validatedPassword: boolean = false;

    function hashedPasswordCallback( error: Error, result: boolean ) {

        if ( error ) {

            console.log( error );

            validatedPassword = false;

            return false;

        }

        validatedPassword = result;

    }

    bcrypt.compare( plainPassword, hashedPassword, hashedPasswordCallback );

    return validatedPassword;

}