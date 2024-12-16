import bcrypt from "bcryptjs";
import { getuserByEmail } from "@/data/user";

import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import Credentials  from "next-auth/providers/credentials"

import { LoginSchema } from "@/schemas";
 
export default { providers: [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID, 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({  
        async authorize(credentials) {
          console.log("Authorize called with credentials:", credentials);
  
          try {
            // Ensure credentials is not undefined
            if (!credentials) {
              console.error("No credentials provided");
              return null;
            }
  
            // Validate credentials structure
            const validatedFields = LoginSchema.safeParse({
              email: credentials.email,
              password: credentials.password
            });
  
            console.log("Validation result:", validatedFields);
  
            if (!validatedFields.success) {
              console.error("Validation failed:", validatedFields.error);
              return null;
            }
  
            const { email, password } = validatedFields.data;
  
            // Log email for debugging
            console.log("Attempting to find user with email:", email);
  
            const user = await getuserByEmail(email);
  
            console.log("User found:", !!user);
  
            if (!user || !user.password) {  
              console.error("User not found or no password");
              return null;
            }
  
            const passwordMatch = await bcrypt.compare(password, user.password);
  
            console.log("Password match:", passwordMatch);
  
            if (passwordMatch) { 
              return user; 
            }
  
            return null;
          } catch (error) {
            console.error("Authorization error:", error);
            return null;
          }
        }
      })
    ]
 } satisfies NextAuthConfig