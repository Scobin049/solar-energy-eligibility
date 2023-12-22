import { ConnectionTypeEnum, ConsumptionClassesEnum, TariffModalitiesEnum } from "../../src/enums/service-criteria.enum"
import { InputCriteria } from "../../src/interfaces/input-criteria.interface"
import { OutputCriteria } from "../../src/interfaces/output-criteria.interface"

export const inputIneligible:InputCriteria = {
  "numeroDoDocumento": "14041737706",
  "tipoDeConexao": ConnectionTypeEnum.biphasic,
  "classeDeConsumo": ConsumptionClassesEnum.rural,
  "modalidadeTarifaria": TariffModalitiesEnum.green,
  "historicoDeConsumo": [
    3878,
    9760,
    5976,
    2797,
    2481,
    5731,
    7538,
    4392,
    7859,
    4160,
  ]
}

export const outputIneligible:OutputCriteria = {
  "elegivel": false,
	"razoesDeInelegibilidade": [
    "Classe de consumo não aceita",
    "Modalidade tarifária não aceita"
  ]
}