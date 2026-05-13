import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { generateImage } from "./_core/imageGeneration";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  studio: router({
    generateImage: protectedProcedure
      .input(
        z.object({
          prompt: z.string().min(10, "الوصف يجب أن يكون على الأقل 10 أحرف"),
          format: z.enum(["square", "portrait", "landscape"]).default("square"),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const { url } = await generateImage({
            prompt: input.prompt,
          });
          return { url };
        } catch (error) {
          throw new Error("فشل توليد الصورة. حاول مرة أخرى.");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
