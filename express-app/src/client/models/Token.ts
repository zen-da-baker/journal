// Import helper functions
import { generateRandom5DigitNumber } from "../helpers/generateRandom5DigitNumber.js";

/*
    The token object would contain a username for who the token belongs to, an expiration date which
    will be a ISO 8601 string that is set for 2 weeks / 14 days from when the object was created, 
    and an id.
    Tokens that expire will be removed when a new one is added by the assignment functions. 
*/
export class Token {

    // The expiration date string
    expirationDate: string;

    // The username string which acts as the primary key in the database
    username: string;

    // The unique ID of this token
    id: string;

    constructor( inputUsername: string ) {

        // The username assignment is straight forward
        this.username = inputUsername;

        // The four sets of numbers used to create the id are all random numbers so the ID is unpredictable
        let num1 = generateRandom5DigitNumber();

        let num2 = generateRandom5DigitNumber();

        let num3 = generateRandom5DigitNumber();

        let num4 = generateRandom5DigitNumber();

        this.id = inputUsername + "-" + num1.toString() + "-" + num2.toString() + "-" + num3.toString() + "-" + num4.toString();

        // The current date is accessed and the expiration date of the token is 2 weeks from the time of creation
        let currentDate = new Date();

        currentDate.setDate( currentDate.getDate() + 14 );

        this.expirationDate = currentDate.toISOString();

    }

}