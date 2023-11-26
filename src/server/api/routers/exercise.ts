import { z } from "zod";
import type { inferAsyncReturnType } from "@trpc/server";

import type { createTRPCContext } from "~/server/api/trpc";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
  } from "~/server/api/trpc";

export const createExerciseRouter = createTRPCRouter({
    addWorkoutDate: protectedProcedure
        .input(z.object({ date: z.string() }))
        .mutation(async ({ input: { date }, ctx }) => {
            const currentUserId = ctx.session.user.id;
            const WorkoutDate = await ctx.prisma.workoutDate.create({
                data: {
                    date,
                    userId: currentUserId,
                },
            });
            return WorkoutDate;
        }),
    getWorkoutDateExercises: protectedProcedure
        .input(z.object({ date: z.string() }))
        .query(async ({ input: { date }, ctx }) => {
            const currentUserId = ctx.session?.user.id;

            const workoutDate = await ctx.prisma.workoutDate.findMany({
                where: { date, userId: currentUserId },
            });

            if (workoutDate && workoutDate.length > 0) {
                const exercises = await ctx.prisma.exercise.findMany({
                    where: { workoutDate: workoutDate[0]},
                });
                return exercises;
            } else {
                return [];
            }
        }),
    createWorkoutDateExercise: protectedProcedure
        .input(z.object({ date: z.string(), exercise: z.string() }))
        .mutation(async ({ input: { date, exercise }, ctx }) => {
            const currentUserId = ctx.session.user.id;
            const workoutDate = await ctx.prisma.workoutDate.findMany({
                where: { date, userId: currentUserId },
            });

            if (workoutDate && workoutDate.length > 0) {
                const newExercise = await ctx.prisma.exercise.create({
                    data: {
                        workoutDateId: workoutDate[0]?.id || "", // Provide a valid string value or an empty string as a fallback
                        name: exercise, // Update the property name to 'name'
                    },
                });
                return newExercise;
            } else {
                return null;
            }
        }),
    getExercises: protectedProcedure
        
        .input(z.object({ 
            date: z.string(),
            userId: z.string() 
        }))
        .query(async ({ input: { date, userId }, ctx }) => {
            const currentUserId = ctx.session?.user.id;
            const exercises = await ctx.prisma.exercises.findMany({
                where: { date, userId },
            });
            return exercises;
        }),
    getExercise: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input: { id }, ctx }) => {
            const currentUserId = ctx.session?.user.id;
            const exercise = await ctx.prisma.exercise.findUnique({
                where: { id },
            });
            return exercise;
        }),
    deleteExercise: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input: { id }, ctx }) => {
            const currentUserId = ctx.session?.user.id;
            const exercise = await ctx.prisma.exercise.delete({
                where: { id },
            });
    