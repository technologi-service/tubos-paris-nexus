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
    const { id, nombre, peso } = body;
    if (!id || typeof nombre !== 'string' || typeof peso !== 'number') {
      return new Response(JSON.stringify({ error: 'Datos inválidos' }), { status: 400 });
    }
    const updated = await prisma.variables_pesos.update({
      where: { id: Number(id) },
      data: { nombre, peso },
    });
    return new Response(JSON.stringify({ message: 'Variable actualizada', variable: updated }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error PATCH variable:', error);
    return new Response(JSON.stringify({ error: 'No se pudo actualizar la variable' }), {
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
