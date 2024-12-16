import { db } from "@/lib/db";
import { Catamaran } from "next/font/google";

export const getPasswordResetTokenbyToken = async (token: string) => {
    try{
        const passwordResetToken = await db.passwordResetToken.findUnique({
            where: {
                token
            }
        });
        return passwordResetToken;
    }
    catch(Error){
        console.log(Error);
        return null;
    }
}

export const getPasswordResetTokenbyEmail = async (email: string)  => {
    try{
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: {
                email
            }
        });
        return passwordResetToken;
    }catch(Error){
        console.log(Error);
        return null;
    }

}