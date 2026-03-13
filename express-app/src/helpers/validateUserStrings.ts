// Import validator package
import validator from "validator";

/*
    This helper function takes an unsanitized input string and escapes the characters
    so that it is a sanitized string ready for operations with my server.
*/
export function validateUserStrings( inputString: string ): string {

    // The validated string will be returned by the end of this function
    let validatedString: string;

    // The character blacklist is applied to the unvalidated string and then assigned to that input string
    inputString = validator.blacklist( inputString, [ "{", "}", "[", "]", "$" ] );

    // The common characters are escaped from the input string and assigned back to the input string
    inputString = validator.escape( inputString );

    // Finally, the string is trimmed for clarity and assigned to the validated string
    validatedString = validator.trim( inputString );

    // Finally, the validated string is returned by the function, ready for operations in the server
    return validatedString;

}