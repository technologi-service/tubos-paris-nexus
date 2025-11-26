import type { APIRoute } from 'astro';
import prisma from '../../../db/prisma';

export const GET: APIRoute = ({ params, request }) => {
  return new Response(
    JSON.stringify({
      message: 'This was a GET!',
    })
  );
};

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { rangos } = body;
    if (!Array.isArray(rangos) || rangos.length === 0) {
      return new Response(JSON.stringify({ error: 'Datos inválidos' }), { status: 400 });
    }
    const results = [];
    for (const r of rangos) {
      if (!r.id || typeof r.min_valor !== 'number' || typeof r.max_valor !== 'number') continue;
      const updated = await prisma.rangos.update({
        where: { id: Number(r.id) },
        data: {
          min_valor: r.min_valor,
          max_valor: r.max_valor,
          puntuacion: r.puntuacion,
        },
      });
      results.push(updated);
    }
    return new Response(
      JSON.stringify({ ok: true, message: 'Rangos actualizados', resultados: results }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error PATCH rangos:', error);
    return new Response(JSON.stringify({ error: 'No se pudo actualizar los rangos' }), {
      status: 500,
    });
  }
};

export const DELETE: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      message: 'This was a DELETE!',
    })
  );
};

export const ALL: APIRoute = ({ request }) => {
  return new Response(
    JSON.stringify({
      message: `This was a ${request.method}!`,
    })
  );
};
