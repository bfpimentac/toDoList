import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({
  createTask: protectedProcedure.input(z.object({name: z.string().min(5).max(50), description: z.string().max(140), priority: z.enum(['LOW', 'MEDIUM', 'HIGH']), done: z.boolean().optional(), endDate: z.string().optional()})).mutation(
    async ({ input, ctx }) => {
      return ctx.prisma.task.create({
        data: {
          ...input,
        userId: ctx.session.user.id
      }});
    }
  ),
  getTask: protectedProcedure.query(
    async ({ ctx }) => {
      return ctx.prisma.task.findMany({
        where: {userId: ctx.session.user.id}
      });
    }
  ),
  editTask: protectedProcedure.input(z.object({
    id: z.string(),
    name: z.string().min(5).max(50).optional(),
    description: z.string().max(140).optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    done: z.boolean().optional(),
    endDate: z.string().optional()
  })).mutation(
    async ({ input, ctx }) => {
      const { id, ...data } = input;

      
      const task = await ctx.prisma.task.findUnique({
        where: { id },
      });

      if (!task) {
        throw new Error("Task not found.");
      }

      if (task.done) {
        throw new Error("Cannot edit a task that is already done.");
      }

      return ctx.prisma.task.update({
        where: { id },
        data
      });
    }
  ),

  deleteTask: protectedProcedure.input(z.object({
    id: z.string()
  })).mutation(
    async ({ input, ctx }) => {
      const { id } = input;
      return ctx.prisma.task.delete({
        where: { id }
      });
    }
  ),
});