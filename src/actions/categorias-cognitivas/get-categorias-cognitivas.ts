import { defineAction } from 'astro:actions';
import prisma from '../../db/prisma';

export const GetCategorias_cognitivas_vcs = defineAction({
  accept: 'json',
  handler: async ({ request }) => {
    try {
      const rangos = await prisma.categorias_cognitivas_vcs.findMany();
      return rangos;
    } catch (error) {
      console.error('Error fetching variable ranges:', error);
      throw new Error('Failed to fetch rangos');
    }
  },
});
