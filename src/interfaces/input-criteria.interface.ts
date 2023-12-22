import { ConnectionTypeEnum, ConsumptionClassesEnum, TariffModalitiesEnum } from "../enums/service-criteria.enum";

export interface InputCriteria {
  numeroDoDocumento: string;
  tipoDeConexao: ConnectionTypeEnum;
  classeDeConsumo: ConsumptionClassesEnum;
  modalidadeTarifaria: TariffModalitiesEnum;
  historicoDeConsumo: number[];
}