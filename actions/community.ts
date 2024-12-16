import { db } from "@/lib/db";
import { z } from "zod";
import { MemberRole, Community, CommunityMember } from "@prisma/client";
import { ActionResponse } from "@/types/action-response";

// Enhanced validation schema with more specific rules
const communitySchema = z.object({
  name: z.string()
    .min(3, { message: "Community name must be at least 3 characters" })
    .max(50, { message: "Community name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z0-9-_ ]+$/, { 
      message: "Community name can only contain letters, numbers, spaces, hyphens, and underscores" 
    }),
  description: z.string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description cannot exceed 500 characters" }),
  logo: z.string().url({ message: "Logo must be a valid URL" }).optional(),
  members: z.array(z.object({
    email: z.string().email({ message: "Invalid email address" }),
    designation: z.enum(["member", "elder", "co-leader", "leader"], {
      errorMap: () => ({ message: "Invalid role designation" })
    })
  })).max(50, { message: "Cannot invite more than 50 members at once" }).optional()
});

export type CreateCommunityInput = z.infer<typeof communitySchema>;

interface CommunityWithMembers extends Community {
  members: CommunityMember[];
  _count: { members: number };
}

/**
 * Check if a user is already a member of any community
 * @param userId - The ID of the user to check
 * @returns Promise<boolean> - True if user is already in a community
 * @throws Error if database query fails
 */
export async function isUserInAnyCommunity(userId: string): Promise<boolean> {
  if (!userId) throw new Error("User ID is required");

  try {
    const existingMembership = await db.communityMember.findFirst({
      where: {
        OR: [
          { community: { creatorId: userId } },
          { email: { equals: userId } }
        ]
      }
    });

    return !!existingMembership;
  } catch (error) {
    console.error("Error checking user community membership:", error);
    throw new Error("Failed to check community membership");
  }
}

/**
 * Check if a community name already exists
 * @param name - The name of the community to check
 * @returns Promise<boolean> - True if community name exists
 * @throws Error if database query fails
 */
export async function isCommunityNameTaken(name: string): Promise<boolean> {
  if (!name) throw new Error("Community name is required");

  try {
    const existingCommunity = await db.community.findFirst({
      where: { 
        name: { 
          equals: name,
          mode: 'insensitive' // Case-insensitive comparison
        }
      }
    });

    return !!existingCommunity;
  } catch (error) {
    console.error("Error checking community name:", error);
    throw new Error("Failed to check community name availability");
  }
}

/**
 * Create a new community with members
 * @param data - Community creation data
 * @returns Promise<ActionResponse> with success status and data
 */
export async function createCommunity(data: CreateCommunityInput): Promise<ActionResponse> {
  try {
    // Validate input
    const validationResult = communitySchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error.errors[0].message
      };
    }

    // Get current user
    const user = await currentUser();
    if (!user?.id || !user?.email) {
      return {
        success: false,
        error: "User authentication failed"
      };
    }

    // Validate user membership
    const isInCommunity = await isUserInAnyCommunity(user.id);
    if (isInCommunity) {
      return {
        success: false,
        error: "You are already a member of a community"
      };
    }

    // Validate community name
    const nameTaken = await isCommunityNameTaken(data.name);
    if (nameTaken) {
      return {
        success: false,
        error: "A community with this name already exists"
      };
    }

    // Create community with transaction
    const newCommunity = await db.$transaction(async (prisma) => {
      // Create the community
      const community = await prisma.community.create({
        data: {
          name: data.name.trim(),
          description: data.description.trim(),
          logo: data.logo || '',
          creatorId: user.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });

      // Prepare member data with email validation
      const memberEmails = new Set([user.email]);
      const memberData = [
        // Creator as leader
        {
          email: user.email,
          role: MemberRole.LEADER,
          communityId: community.id,
          joinedAt: new Date()
        }
      ];

      // Add invited members with duplicate email check
      if (data.members?.length) {
        for (const member of data.members) {
          if (!memberEmails.has(member.email)) {
            memberEmails.add(member.email);
            memberData.push({
              email: member.email,
              role: member.designation.toUpperCase() as MemberRole,
              communityId: community.id,
              joinedAt: new Date()
            });
          }
        }
      }

      // Create members
      await prisma.communityMember.createMany({
        data: memberData
      });

      return community;
    });

    return {
      success: true,
      data: newCommunity,
      message: "Community created successfully"
    };

  } catch (error) {
    console.error("Community creation error:", error);
    return {
      success: false,
      error: "Failed to create community. Please try again."
    };
  }
}

/**
 * Get community details for a user
 * @param userId - The ID of the user
 * @returns Promise<CommunityWithMembers | null>
 * @throws Error if database query fails
 */
export async function getUserCommunity(userId: string): Promise<CommunityWithMembers | null> {
  if (!userId) throw new Error("User ID is required");

  try {
    const community = await db.community.findFirst({
      where: {
        OR: [
          { creatorId: userId },
          { members: { some: { email: userId } } }
        ]
      },
      include: {
        members: {
          orderBy: {
            joinedAt: 'asc'
          }
        },
        _count: {
          select: { members: true }
        }
      }
    });

    return community;
  } catch (error) {
    console.error("Error fetching user community:", error);
    throw new Error("Failed to fetch user community");
  }
}

/**
 * Update community details
 * @param communityId - The ID of the community to update
 * @param data - Partial community data to update
 * @returns Promise<ActionResponse>
 */
export async function updateCommunity(
  communityId: string,
  data: Partial<CreateCommunityInput>
): Promise<ActionResponse> {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return {
        success: false,
        error: "User authentication failed"
      };
    }

    // Check if user has permission to update
    const community = await db.community.findFirst({
      where: {
        id: communityId,
        OR: [
          { creatorId: user.id },
          { 
            members: { 
              some: { 
                email: user.email,
                role: { in: [MemberRole.LEADER, MemberRole.CO_LEADER] }
              } 
            } 
          }
        ]
      }
    });

    if (!community) {
      return {
        success: false,
        error: "You don't have permission to update this community"
      };
    }

    // Validate and update
    const updatedCommunity = await db.community.update({
      where: { id: communityId },
      data: {
        ...(data.name && { name: data.name.trim() }),
        ...(data.description && { description: data.description.trim() }),
        ...(data.logo && { logo: data.logo }),
        updatedAt: new Date()
      }
    });

    return {
      success: true,
      data: updatedCommunity,
      message: "Community updated successfully"
    };

  } catch (error) {
    console.error("Community update error:", error);
    return {
      success: false,
      error: "Failed to update community"
    };
  }
}