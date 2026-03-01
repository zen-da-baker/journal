export class FeedbackMessage {

    id: string;

    name: string;

    email: string;

    subject: string;

    body: string;

    constructor( 
        inputName: string = "", 
        inputEmail: string = "", 
        inputSubject: string = "", 
        inputBody: string = "" 
    ) {

        this.name = inputName;

        this.email = inputEmail;

        this.subject = inputSubject;

        this.body = inputBody;

    }

}