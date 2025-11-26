
import { getRangos } from "./config-rangos/get-rangos";
import { getVariables } from "./config-pesos/get-variables";
import { updateVariable } from "./config-pesos/update-variables";

import { getSegmentosVcs } from "./segmentos/get-segmentos";

export const server = {
  getVariables,
  updateVariable,
  getRangos,
  getSegmentosVcs
}
