export async function updateAllEntries( request: any, response: any ) {

    const body = request.body;

    if ( body === null || body === undefined ) {

        return response.status( 400 ).json({
            msg: "The body of the request was empty."
        })

    }

    // if ( body. )

}