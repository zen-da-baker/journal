// Import bcrypt package
import bcrypt from "bcrypt";

export async function validatePassword( plainPassword: string, hashedPassword: string ): Promise<boolean> {

    let validatedPassword: boolean = false;

    validatedPassword = await bcrypt.compare( plainPassword, hashedPassword );

    return validatedPassword;

}