import { ConnectionTypeEnum } from "../src/enums/service-criteria.enum";
import { eligibilityCriteria } from "../src/service";
import { inputEligibility, outputEligibility } from "./mock/eligibility.mock";
import { inputIneligible, outputIneligible } from "./mock/ineligible.mock";

describe('Eligibility service', () => {
  test('Should be return data eligibility', () => {
    const response = eligibilityCriteria(inputEligibility)
    expect(response).toEqual(outputEligibility)
  });

  test('Should be return data ineligible', () => {
    try {
      eligibilityCriteria({
        ...inputIneligible,
        tipoDeConexao: ConnectionTypeEnum.singlePhase
      })
    } catch (error) {
      expect(error).toEqual(outputIneligible)      
    }
  });

  test('', () => {
    try{
      const response = eligibilityCriteria({
        ...inputEligibility,
        tipoDeConexao: '' as ConnectionTypeEnum
      })
    } catch (error) {
      expect(error).toEqual({
        ...outputIneligible,
        razoesDeInelegibilidade: [
         "Consumo muito baixo para tipo de conexão"
        ]
      })      
    }
  });
 
  test('Should be return "Minimum Customer Consumption" error', () => {
    try {
      eligibilityCriteria({
        ...inputIneligible,
        tipoDeConexao: ConnectionTypeEnum.threePhase,
        historicoDeConsumo: [258,258,369]
      })
    } catch (error) {
      expect(error).toEqual({
        ...outputIneligible,
        razoesDeInelegibilidade: [
          "Classe de consumo não aceita",
         "Modalidade tarifária não aceita",
         "Consumo muito baixo para tipo de conexão"
        ]
      })      
    }
  });

  
});