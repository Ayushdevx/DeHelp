import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenbyEmail } from "@/data/password-reset-token";

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expiresAt = new Date(new Date().getTime() + 3600 * 1000);

    const exsisitingToken = await getVerificationTokenByEmail(email);

    if (exsisitingToken) {
        await db.verficationToken.delete({
            where: {
                id: exsisitingToken.id,
            },
        }); 
    }

    const verficationToken = await db.verficationToken.create({
        data: {
            email,
            token,
            expiresAt,
        },
    });

    return verficationToken;
};

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();

    const expiresAt = new Date(new Date().getTime() + 1800 * 1000);

    const exsisitingToken = await getPasswordResetTokenbyEmail(email);

    if (exsisitingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: exsisitingToken.id,
            },
        }); 
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expiresAt,
        },
    });

    return passwordResetToken;

}