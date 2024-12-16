"use server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenbyToken } from "@/data/password-reset-token";
import { getuserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { error } from "console";


export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token: string | null) => {
    if (!token) {
        return {
            error: "Token is Missing!",
        };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if(!validatedFields.success){
        return {
            error: "Password is not Valid."
        };
    }

    const {password, confirmPassword }  =validatedFields.data;

    if (password !== confirmPassword) {
        return {
            error: "Passwords do not match",
        };
    }

    const exsisitingToken = await getPasswordResetTokenbyToken(token);

    if (!exsisitingToken) {
        return {
            error: "Token is invalid, use new Link.",
        };
    };

    const hasExpired = new Date(exsisitingToken.expiresAt) < new Date();

    if (hasExpired) {
        return {
            error: "Token have expired, reset again.",
        };
    }

    const exissitingUser = await getuserByEmail(exsisitingToken.email);

    if (!exissitingUser) {
        return {
            error: "User email does not exist.",
        };
    }

    const userpasswordHash = exissitingUser.password;

    if (!userpasswordHash) {
        return {
            error: "User have registered with other Auth Provider.",
        };
    }
    
    // Compare the new password with the existing hashed password
    const isSamePassword = await bcrypt.compare(password, userpasswordHash);
    
    if (isSamePassword) {
        return {
            error: "Password already used, Use a different password.",
        };
    }
    
    // Hash the new password
    const passwordHash = await bcrypt.hash(password, 10);
    

    await db.user.update({
        where: {
            id: exissitingUser.id,
        },
        data: {
            password: passwordHash,
        },
    });

    await db.passwordResetToken.delete({
        where: {
            id: exsisitingToken.id,
        },
    });

    return {
        success: "Password has been updated.",
        redirect: DEFAULT_LOGIN_REDIRECT
    };
};