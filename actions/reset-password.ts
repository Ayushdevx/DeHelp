"use server";

import * as z from "zod";
import { ResetPasswordSchema } from "@/schemas";
import { getuserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
    const validatedFields = ResetPasswordSchema.safeParse(values);

    if(!validatedFields.success){       
        return {error : "Invalid email"};
    }

    const {email} = validatedFields.data;

    const user = await getuserByEmail(email);

    if(!user){
        return {error : "Email not found!"}
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail(
        passwordResetToken.email, 
        passwordResetToken.token
    );

    return { 
        success : "Reset password Email sent",
        redirect: DEFAULT_LOGIN_REDIRECT
     };
};