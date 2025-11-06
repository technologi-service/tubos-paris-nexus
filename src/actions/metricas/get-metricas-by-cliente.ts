// src/actions/metricas/getMetricasByCliente.ts
import { defineAction } from 'astro:actions';
import prisma from '../../db/prisma';
import { z } from 'astro:schema';

export const getMetricasByCliente = defineAction({
  accept: 'json',
  input: z.object({
    id: z.number(),
  }),
  handler: async ({ id }: { id: number }) => {
    // Ajusta la consulta según tu modelo
    const metricas = await prisma.vcs.findUnique({
      where: { id_cliente: id.toString() },
      select: {

        id_cliente: true,
        nombre_empresa: true,
        ano: true,
        mes: true,
        ponderacion_vcs: true,
        segmento_numerico: true,
        segmento_categorico: true,
        puntuacion_frecuencia: true,
        puntuacion_volumen: true,
        puntuacion_recency: true,
        puntuacion_margen: true,
        frecuencia: true,
      },
    });
    return metricas;
  },
});
