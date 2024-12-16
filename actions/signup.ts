"use server";

import { z } from "zod";
import { SignupSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getuserByEmail } from "@/data/user";
import {generateVerificationToken} from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/mail";

type SignupSchemaType = z.infer<typeof SignupSchema>;

export const signup = async (values: SignupSchemaType) => {
  const validatedFields = SignupSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid credentials",
    };
  }

  const { name, email, password, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const existingUser = await getuserByEmail(email);

  if (existingUser) {
    return {
      error: "User with this email already exists",
    };
  }

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(email, verificationToken.token);


  return { success: "Signup successful! Verify your email to continue." };

  // Rest of your signup logic
  // For example:
  // const user = await createUser(values);
  // if (user) {
  //   // Send verification email
  // }
};