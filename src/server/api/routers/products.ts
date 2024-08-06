import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getProducts } from "~/server/utils/z2uUtils";

export const productRouter = createTRPCRouter({
  getProductsByName: publicProcedure
    .input(
      z.object({
        query: z.string(),
        page: z.preprocess(
          (val) => parseInt(val as string),
          z.number().positive().default(1),
        ),
        isImageUrl: z.boolean().default(false),
      }),
    )
    .query(async ({ input }) => {
      return await getProducts(input.page, input.query, input.isImageUrl);
    }),
});
