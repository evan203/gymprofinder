import { z } from "zod";
import { Prisma } from "@prisma/client";
import { inferAsyncReturnType } from "@trpc/server";


import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  createTRPCContext,
} from "~/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input: { id }, ctx }) => {
      const currentUserId = ctx.session?.user.id;
      const profile = await ctx.prisma.user.findUnique({
        where: { id },
        select: {
          name: true,
          image: true,
          bio: true,
          _count: { select: { followers: true, follows: true } },
          followers:
            currentUserId == null
              ? undefined
              : { where: { id: currentUserId } },
        },
      });

      if (profile == null) return;

      return {
        name: profile.name,
        image: profile.image,
        bio: profile.bio,
        followersCount: profile._count.followers,
        followsCount: profile._count.follows,
        isFollowing: profile.followers.length > 0,
      };
    }),
  toggleFollow: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input: { userId }, ctx }) => {
      const currentUserId = ctx.session.user.id;
      const existingFollow = await ctx.prisma.user.findFirst({
        where: { id: userId, followers: { some: { id: currentUserId } } },
      });

      let addedFollow;
      if (existingFollow == null) {
        await ctx.prisma.user.update({
          where: { id: userId },
          data: { followers: { connect: { id: currentUserId } } },
        });
        addedFollow = true;
      } else {
        await ctx.prisma.user.update({
          where: { id: userId },
          data: { followers: { disconnect: { id: currentUserId } } },
        });
        addedFollow = false;
      }

      void ctx.revalidateSSG?.(`/profiles/${userId}`);
      void ctx.revalidateSSG?.(`/profiles/${currentUserId}`);

      return { addedFollow };
    }),

  // pasted from tweet.ts; changed getInfiniteUsers
  infiniteFeed: publicProcedure
    .input(
      z.object({
        onlyFollowing: z.boolean().optional(), 
        limit: z.number().optional(),
        cursor: z.object({ id: z.string(), createdAt: z.date() }).optional(),
      })
    )
    .query(
      async ({ input: { limit = 10, onlyFollowing = false, cursor }, ctx }) => {

        return await getInfiniteUsers({ // getInfiniteUsers has to be implemented now
          limit,
          ctx,
          cursor,
        });
      }
    ),
});


// Use this type when working with your user data


// gpt generated from getInfiniteTweets. maybe broken?
async function getInfiniteUsers({
  ctx,
  limit,
  cursor,
}: {
  limit: number;
  cursor: { id: string } | undefined;
  ctx: inferAsyncReturnType<typeof createTRPCContext>; // TODO: got to be added
}) {
  const currentUserId = ctx.session?.user.id;

  const data  = await ctx.prisma.user.findMany({
    take: limit + 1,
    cursor: cursor ? { id: cursor.id } : undefined,
    orderBy: [{ id: "desc" }], // Modify the orderBy as needed
    select: {
      id: true,
      name: true,
      image: true,
      emailVerified: true,
      // Add more user properties as needed
      _count: { select: { followers: true, follows: true } },
      followers:
        currentUserId == null
          ? undefined
          : { where: { id: currentUserId } },
    },
  });

  let nextCursor: typeof cursor | undefined;
  if (data.length > limit) {
    const nextItem = data.pop();
    if (nextItem != null) {
      nextCursor = { id: nextItem.id };
    }
  }

  return {
    users: data.map((user) => {
      return {
        id: user.id,
        name: user.name,
        image: user.image,
        emailVerified: user.emailVerified,
        // Include additional user properties as needed
        followersCount: user._count?.followers ?? 0,
        followsCount: user._count?.follows ?? 0,
        isFollowing: user.followers?.length > 0,
      };
    }),
    nextCursor,
  };
}
