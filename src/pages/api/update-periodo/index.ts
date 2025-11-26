import type { APIRoute } from 'astro';
import prisma from '../../../db/prisma';

export const PATCH: APIRoute = async ({ request }) => {
  try {
    // 1. Recibimos el objeto directo (desestructuramos id y periodo)
    const body = await request.json();
    const { id, periodo } = body;

    // 2. Validación básica
    if (!id) {
      return new Response(JSON.stringify({ error: 'Falta el ID del registro' }), { status: 400 });
    }

    // 3. Update directo (Una sola operación a la BD)
    const updated = await prisma.periodo_vcs.update({
      where: { id: Number(id) },
      data: {
        periodo: periodo,
      },
    });

    // 4. Respuesta exitosa
    return new Response(
      JSON.stringify({
        message: 'Actualizado correctamente',
        data: updated,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error API Update:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
};
