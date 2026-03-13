export class FeedbackMessage {

    id: string;

    name: string;

    email: string;

    subject: string;

    body: string;

    submittedFrom: string;

    constructor( 
        inputName: string = "", 
        inputEmail: string = "", 
        inputSubject: string = "", 
        inputBody: string = "",
        inputSubmittedFrom: string = ""
    ) {

        this.name = inputName;

        this.email = inputEmail;

        this.subject = inputSubject;

        this.body = inputBody;

        this.submittedFrom = inputSubmittedFrom;

    }

}