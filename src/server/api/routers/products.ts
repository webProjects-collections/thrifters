import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getProducts } from "~/server/utils/z2uUtils";

export const productRouter = createTRPCRouter({
  getProductsByName: publicProcedure
    .input(
      z.object({ query: z.string(), page: z.number().positive().default(1) }),
    )
    .query(async ({ input }) => {
      return await getProducts(input.page, input.query);
    }),
});
