// Import helper functions
import { generateRandom5DigitNumber } from "../helpers/generateRandom5DigitNumber.js";

/*
    The token object would contain a username for who the token belongs to, an expiration date which
    will be a ISO 8601 string that is set for 2 weeks / 14 days from when the object was created, 
    and an id.
    Tokens that expire will be removed when a new one is added by the assignment functions. 
*/
export class Token {

    expirationDate: string;

    username: string;

    id: string;

    constructor( inputUsername: string ) {

        this.username = inputUsername;

        let num1 = generateRandom5DigitNumber();

        let num2 = generateRandom5DigitNumber();

        let num3 = generateRandom5DigitNumber();

        let num4 = generateRandom5DigitNumber();

        this.id = inputUsername + "-" + num1.toString() + "-" + num2.toString() + "-" + num3.toString() + "-" + num4.toString();

        let currentDate = new Date();

        currentDate.setDate( currentDate.getDate() + 14 );

        this.expirationDate = currentDate.toISOString();

    }

}