import { defineAction } from 'astro:actions';
import prisma from '../../db/prisma';

export const getRangos = defineAction({
  accept: 'json',
  handler: async ({ request }) => {
    try {
      const rangos = await prisma.variables_rangos.findMany();
      return rangos;
    } catch (error) {
      console.error('Error fetching variable ranges:', error);
      throw new Error('Failed to fetch variable ranges');
    }
  },
});
