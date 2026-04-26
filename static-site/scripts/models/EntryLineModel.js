// Import the random number generator
import { generateRandom5DigitNumber } from "../helpers/generateRandom5DigitNumber.js";
/*
    This data model is for the lines displayed on each of the journal entries.
    The line has an ID for easy reference by the DOM, an element type that corresponds to HTML elements,
    and a value that is a string.
*/
export class EntryLineModel {
    constructor(inputType = "p", inputValue = "", inputAltText = "") {
        // The element type is a paragraph by default
        // Expected element types are p, h1, h2, h3, img, and video
        this.type = "p";
        // The string value of the line which is always defaulted as empty text
        this.value = "";
        // Incase the element type is an image, an alt text field can be added
        this.altText = "";
        // The ID of the line is generated without the need to check if it already exists
        this.id = `${generateRandom5DigitNumber()}-${generateRandom5DigitNumber()}`;
        this.type = inputType;
        this.value = inputValue;
        this.altText = inputAltText;
    }
}
