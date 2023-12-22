import {
  AVERAGE_CO2_EMISSION, KWH_CO2_EMISSION, MAX_RECENT_VALUES,
  MIN_BIPHASIC,
  MIN_MONOPHASE,
  MIN_THREEPHASIC,
  consumptionClassesError,
  minimumCustomerConsumptionError,
  tariffModalityError
} from "./constants";
import { ConnectionTypeEnum, ConsumptionClassesEnum, TariffModalitiesEnum } from "./enums/service-criteria.enum";
import { InputCriteria } from "./interfaces/input-criteria.interface";
import { OutputCriteria } from "./interfaces/output-criteria.interface";

export const eligibilityCriteria = (payload: InputCriteria): OutputCriteria => {
  const historyConsumption = payload.historicoDeConsumo.slice(0, MAX_RECENT_VALUES)
  const sumConsumption = historyConsumption.reduce((acc, num) => acc + num, 0);
  const averageConsumption = sumConsumption / historyConsumption.length;

  validateRules(payload, averageConsumption)

  return { elegivel: true, economiaAnualDeCO2: calculateAnnualSavingsProjection(averageConsumption) }
}

const minimumCustomerConsumptionValidation = (averageConsumption: number, tipoDeConexao: ConnectionTypeEnum): boolean => {
  switch(tipoDeConexao){
    case ConnectionTypeEnum.monoPhase:
      return averageConsumption >= MIN_MONOPHASE;
    case ConnectionTypeEnum.biphasic:
      return averageConsumption >= MIN_BIPHASIC;
    case ConnectionTypeEnum.threePhase:
      return averageConsumption >= MIN_THREEPHASIC;
  }
}

const calculateAnnualSavingsProjection = (averageConsumption:number): number => {
  const annualProjection = averageConsumption * MAX_RECENT_VALUES;
  return (annualProjection * AVERAGE_CO2_EMISSION) / KWH_CO2_EMISSION;

}

const validateRules = (payload: InputCriteria, averageConsumption:number): void => {
  const eligibleConsumptionClasses = [ConsumptionClassesEnum.residential, ConsumptionClassesEnum.industrial, ConsumptionClassesEnum.commercial];
  const eligibleTariffModality = [TariffModalitiesEnum.white, TariffModalitiesEnum.conventional];  
  const isMinimumCustomerConsumption = minimumCustomerConsumptionValidation(averageConsumption, payload.tipoDeConexao);

  const errors = [];
  if(!eligibleConsumptionClasses.includes(payload.classeDeConsumo)) errors.push(consumptionClassesError);  
  if(!eligibleTariffModality.includes(payload.modalidadeTarifaria)) errors.push(tariffModalityError);  
  if(!isMinimumCustomerConsumption) errors.push(minimumCustomerConsumptionError);
  if(!!errors.length) throw { elegivel: false, razoesDeInelegibilidade: errors }; 
}