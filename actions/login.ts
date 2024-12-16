"use server";

import { z } from "zod";
import { LoginSchema } from "@/schemas";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";

import {generateVerificationToken} from "@/lib/tokens";
import { getuserByEmail } from "@/data/user";

import {sendVerificationEmail} from "@/lib/mail";

type LoginSchemaType = z.infer<typeof LoginSchema>;

export const login = async (values: LoginSchemaType, callbackUrl?: string | null) => {

    const validatedFields = LoginSchema.safeParse(values);
  
    if (!validatedFields.success) {
      return {
        error: "The credentials you provided were not valid.",
      };
    }
  
    const { email, password } = validatedFields.data;

    const existingUser = await getuserByEmail(email);

    if (!existingUser || !existingUser.password || !existingUser.email) {  
        return {
            error: "The credentials you provided were not valid.",
          };
     }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(existingUser.email, verificationToken.token);
        return {
            success: "Confirmation email was sent to your email.",
        };
    }

    try {
      const result = await signIn("credentials", { 
        email, 
        password, 
        redirect: false
        // redirectTo: DEFAULT_LOGIN_REDIRECT 
      });
  
  
      return { 
        success: "Authenticated, Login successful!",
        redirect: callbackUrl || DEFAULT_LOGIN_REDIRECT
      };
    }
    catch(error) {
      if(error instanceof AuthError) {
        switch(error.type) {
          case "CredentialsSignin":
            return {
              error: "The credentials you provided were not valid.",
            };
          default:
            return {
              error: "Something went wrong!",
            };
        }
      }
      throw error;
    }
  };