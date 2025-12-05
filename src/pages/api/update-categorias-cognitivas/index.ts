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
    const { categorias } = body;
    if (!Array.isArray(categorias) || categorias.length === 0) {
      return new Response(JSON.stringify({ error: 'Datos inválidos' }), { status: 400 });
    }
    const results = [];
    for (const cat of categorias) {
      if (!cat.id || typeof cat.de !== 'number' || typeof cat.a !== 'number') continue;
      const updated = await prisma.categorias_cognitivas_vcs.update({
        where: { id: Number(cat.id) },
        data: {
          de: cat.de,
          a: cat.a,
          categoria_cognitiva: cat.categoria_cognitiva,
        },
      });
      results.push(updated);
    }
    return new Response(
      JSON.stringify({ ok: true, message: 'Categorías actualizadas', resultados: results }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error PATCH categorias:', error);
    return new Response(JSON.stringify({ error: 'No se pudo actualizar las categorías' }), {
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
