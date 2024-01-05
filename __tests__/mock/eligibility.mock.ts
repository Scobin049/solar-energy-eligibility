import { CommercialSubClassEnum, ConnectionTypeEnum, ConsumptionClassesEnum, TariffModalitiesEnum } from "../../src/enums/service-criteria.enum"
import { InputCriteria } from "../../src/interfaces/input-criteria.interface"
import { OutputCriteria } from "../../src/interfaces/output-criteria.interface"

export const inputEligibility: InputCriteria = {
  "numeroDoDocumento": "90256047065",
  "tipoDeConexao": ConnectionTypeEnum.biphasic,
  "classeDeConsumo": ConsumptionClassesEnum.commercial,
  "subclasseDeConsumo": CommercialSubClassEnum.commercial,
  "modalidadeTarifaria": TariffModalitiesEnum.conventional,
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
    6941,
    4597
  ]
}

export const outputEligibility : OutputCriteria= {
  "elegivel": true,
  "economiaAnualDeCO2": 5553.24,
}