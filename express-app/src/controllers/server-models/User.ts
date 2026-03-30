import { Token } from "../../client/models/Token.js";

export class User {

    username: string;

    password: string;

    listOfTokens: Array<Token>;

    constructor( inputUsername: string = "", inputPassword: string = "" ) {

        this.username = inputUsername;

        this.password = inputPassword;

        this.listOfTokens = [];

    }

}