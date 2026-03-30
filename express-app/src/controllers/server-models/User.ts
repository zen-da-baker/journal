import { Token } from "../../client/models/Token.js";

export class User {

    username: string;

    password: string;

    listOfTokens: Array<Token>;

}