export class FeedbackMessage {
    constructor(inputName = "", inputEmail = "", inputSubject = "", inputBody = "", inputSubmittedFrom = "") {
        this.name = inputName;
        this.email = inputEmail;
        this.subject = inputSubject;
        this.body = inputBody;
        this.submittedFrom = inputSubmittedFrom;
    }
}
