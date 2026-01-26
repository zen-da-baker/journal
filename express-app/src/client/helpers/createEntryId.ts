import { generateRandom5DigitNumber } from "./generateRandom5DigitNumber.js";
import { checkIfIdExists } from "./checkIfIdExists.js";

export function createEntryId(): string {

    // Generate three random numbers
    let num1 = generateRandom5DigitNumber();

    let num2 = generateRandom5DigitNumber();

    let num3 = generateRandom5DigitNumber();

    // Pair the numbers together as an id for the entry
    let id = num1.toString() + "-" + num2.toString() + "-" + num3.toString();

    // Check if the new ID already exists
    let exists: boolean = checkIfIdExists( id );

    // If the new ID exists, perform this helper function again to generate a new ID
    if ( exists === true ) {

        return createEntryId();

    }

    // If the new ID did not already exist, return the id 
    return id;

}