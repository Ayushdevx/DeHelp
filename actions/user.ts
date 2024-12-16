"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getuserByEmail } from "@/data/user";

export async function updateUserName(formData: FormData) {
  const session = await auth();
  
  if (!session?.user?.email) {
    return { error: "Not authenticated" };
  }

  const newName = formData.get("name") as string;

  if (!newName || newName.trim() === "") {
    return { error: "Name cannot be empty" };
  }

  try {
    const existingUser = await getuserByEmail(session.user.email);

    if (!existingUser) {
      return { error: "User not found" };
    }

    const updatedUser = await db.user.update({
      where: { email: session.user.email },
      data: { name: newName }
    });

    return { 
      success: "Name updated successfully", 
      user: { 
        name: updatedUser.name 
      } 
    };
  } catch (error) {
    console.error("Error updating user name:", error);
    return { error: "Failed to update name" };
  }
}