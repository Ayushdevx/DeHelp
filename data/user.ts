import {db } from "@/lib/db";

export const getuserByEmail = async (email: string) => {
    try {
      console.log("Full Environment:", {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL ? 'URL is set' : 'URL is NOT set',
      });

      console.log("Searching for user with email:", email);
      
      // Explicit database connection check
      const user = await db.user.findUnique({
        where: { email: email || undefined }
      });
      
      console.log("User query result:", user);
      return user;
    } catch (error) {
      console.error("Detailed database error:", {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace',
        errorType: typeof error,
        stringError: String(error)
      });
      return null;
    }
  };

export const getuserById = async (id: string) => {
    try{
        const user = await db.user.findUnique({
            where: {
                id,
            },
        });
        return user;   
    }     catch (error) {
        return null;
    }
}