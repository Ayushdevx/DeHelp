"use server";
import { db } from "@/lib/db";
import { getuserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
    const exsisitingToken = await getVerificationTokenByToken(token);

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

    const user = await getuserByEmail(exsisitingToken.email);

    if (!user) {
        return {
            error: "User not found.",
        };
    }

    await db.user.update({
        where: {
            id: user.id,
        },
        data: {
            emailVerified: new Date(),
            email: exsisitingToken.email,
        },
    });

    await db.verficationToken.delete({
        where: {
            id: exsisitingToken.id,
        },
    });

    return {
        success: "Email verified successfully.",
    };
}

    