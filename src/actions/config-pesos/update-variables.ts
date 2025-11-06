import { defineAction } from 'astro:actions';
import prisma from '../../db/prisma';
import { z } from 'astro:schema';

export const updateVariable = defineAction({
  accept: 'json',
  input: z.object({
    id: z.number(),
    peso: z.number(),
  }),

  handler: async ({ id, peso }) => {
    try {
      const updated = await prisma.variable.update({
        where: { id },
        data: { peso },
      });
      return updated;
    } catch (error) {
      console.error('Error actualizando variable:', error);
      throw new Error('No se pudo actualizar la variable');
    }
  },
});
