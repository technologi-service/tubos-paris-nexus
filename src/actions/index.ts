
import { getRangos } from "./config-rangos/get-rangos";
import { getVariables } from "./config-pesos/get-variables";
import { updateVariable } from "./config-pesos/update-variables";

import { getSegmentosVcs } from "./segmentos/get-segmentos";
import { getPeriodo } from "./periodo/get-periodo";
import { GetCategorias_cognitivas_vcs } from "./categorias-cognitivas/get-categorias-cognitivas";

export const server = {
  getVariables,
  updateVariable,
  getRangos,
  getSegmentosVcs,
  getPeriodo,
  GetCategorias_cognitivas_vcs,
}
