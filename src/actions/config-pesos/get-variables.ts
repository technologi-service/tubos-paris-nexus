import { defineAction } from "astro:actions";
import prisma from "../../db/prisma";

export const getVariables = defineAction({
  accept: 'json',
  handler: async ({ request }) => {
   try {
      const variables = await prisma.variables_pesos.findMany()
      return variables
   } catch (error) {
     console.error("Error fetching variable weights:", error);
       throw new Error("Failed to fetch variable weights");
     }
    }
  });
