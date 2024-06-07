import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import bcrypt from "bcryptjs";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure.input(z.object({ name: z.string(), email: z.string().email(), password: z.string().transform((v) => bcrypt.hashSync(v, 6)) })).mutation(
    async ({ input, ctx }) => {
      return ctx.prisma.user.create({ data: input });
    }
  ),


  getUser: protectedProcedure.query(
    async ({ ctx }) => {
      return ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
      });
    }
  ),
  editUser: protectedProcedure.input(z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().optional().transform((v) => v ? bcrypt.hashSync(v, 6) : undefined)
  })).mutation(
    async ({ input, ctx }) => {
      // Remove campos undefined do input
      const data = Object.fromEntries(
        Object.entries(input).filter(([_, v]) => v !== undefined)
      );

      return ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data
      });
    }
  ),

  deleteUser: protectedProcedure.mutation(
    async ({ ctx }) => {
      const userId = ctx.session.user.id;


      await ctx.prisma.task.deleteMany({
        where: { userId }
      });


      return ctx.prisma.user.delete({
        where: { id: userId }
      });
    }
  ),
});