export async function loginHandler( request: any, response: any, next: any ) {

    const body = request.body;

    if ( body === null || body === undefined ) {

        return response.status( 400 ).json({
            msg: "The request lacked the necessary information to be acted upon. Please submit a username and password."
        })
    }

}