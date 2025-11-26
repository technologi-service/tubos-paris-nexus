import type { APIRoute } from 'astro';
import prisma from '../../../db/prisma';

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // 1. Recibir 'variables' (que es lo que envía el frontend de pesos)
    const { variables } = body;

    // Validación simple
    if (!Array.isArray(variables) || variables.length === 0) {
      return new Response(JSON.stringify({ error: 'No se recibieron datos válidos (variables)' }), {
        status: 400,
      });
    }

    const actualizados = [];

    // 2. Recorrer y actualizar
    for (const item of variables) {
      // Saltamos si no tiene ID
      if (!item.id) continue;

      try {
        // AJUSTA EL NOMBRE DE LA TABLA AQUÍ SI ES DIFERENTE
        // (ej: prisma.variable.update o prisma.catalogo_variables_vcs.update)
        const update = await prisma.variable.update({
          where: { id: item.id },
          data: {
            // Actualizamos solo el peso, asegurando que sea número
            peso: Number(item.peso),
          },
        });

        actualizados.push(update);
      } catch (error) {
        console.error(`Error actualizando variable ID ${item.id}:`, error);
        // Continuamos con el siguiente aunque este falle
      }
    }

    // 3. Respuesta Final
    return new Response(
      JSON.stringify({
        message: 'Pesos guardados correctamente',
        data: actualizados,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error general:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
};
