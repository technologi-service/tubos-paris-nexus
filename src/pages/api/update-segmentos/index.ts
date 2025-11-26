import type { APIRoute } from 'astro';
import prisma from '../../../db/prisma';
import { Prisma } from '@prisma/client';

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // CORRECCIÓN 1: Extraemos 'segmentos' en lugar de 'rangos'
    // para coincidir con lo que envía el frontend.
    const { segmentos } = body;

    // Validación inicial
    if (!Array.isArray(segmentos) || segmentos.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Datos inválidos: se requiere un arreglo de segmentos' }),
        { status: 400 }
      );
    }

    const promesasUpdate = segmentos.map(async (r: any) => {
      if (!r.id || typeof r.id !== 'number') {
        throw new Error(`ID inválido: ${r.id}`);
      }

      // Validación lógica de los scores
      // Nota: Convertimos a Number por si llegan como string desde el input HTML
      const min = Number(r.score_min);
      const max = Number(r.score_max);

      if (min >= max) {
        // Opcional: Puedes lanzar error o permitirlo si tu lógica de negocio lo acepta.
        // throw new Error(`El valor mínimo (${min}) no puede ser mayor o igual al máximo (${max})`);
      }

      try {
        const updated = await prisma.catalogo_segmentos_vcs.update({
          where: { id: r.id },
          data: {
            estrellas: r.estrellas,
            score_min: min,
            score_max: max,
            // CORRECCIÓN 2: Mapeo de nombres
            // El frontend envía 'nombre_categoria', la DB espera 'segmento'
            nombre_categoria: r.nombre_categoria,
          },
        });
        return updated;
      } catch (dbError) {
        if (dbError instanceof Prisma.PrismaClientKnownRequestError) {
          if (dbError.code === 'P2025') {
            throw new Error('El registro no existe en la base de datos');
          }
        }
        throw dbError;
      }
    });

    const resultadosRaw = await Promise.allSettled(promesasUpdate);

    const results: any[] = [];
    const errores: any[] = [];

    resultadosRaw.forEach((res, index) => {
      const itemOriginal = segmentos[index];

      if (res.status === 'fulfilled') {
        results.push(res.value);
      } else {
        console.error(`Error en ID ${itemOriginal.id}:`, res.reason);
        errores.push({
          id: itemOriginal.id,
          error: res.reason?.message || 'Error desconocido',
        });
      }
    });

    return new Response(
      JSON.stringify({
        message: 'Proceso completado',
        procesados: results.length,
        fallidos: errores.length,
        actualizados: results,
        errores,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error crítico en PATCH segmentos:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor al procesar JSON' }), {
      status: 500,
    });
  }
};
