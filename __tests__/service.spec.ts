import { consumptionClassesError, consumptionSubClassesError, documentInvalidError } from "../src/constants";
import { ConnectionTypeEnum, ConsumptionClassesEnum, TariffModalitiesEnum } from "../src/enums/service-criteria.enum";
import { OutputCriteria } from "../src/interfaces/output-criteria.interface";
import { eligibilityCriteria } from "../src/service";
import { inputEligibility, outputEligibility } from "./mock/eligibility.mock";

describe("Eligibility - Connection type variations", () => {
  test("Should be return data eligibility with biphasic", () => {
    const response = eligibilityCriteria(inputEligibility)
    expect(response).toEqual(outputEligibility)
  });

  test("Should be return data eligibility with CNPJ", () => {
    const response = eligibilityCriteria({...inputEligibility, numeroDoDocumento: "69071147000179"})
    expect(response).toEqual(outputEligibility)
  });

  test("Should be return data eligibility with monoPhase", () => {
    const response = eligibilityCriteria({...inputEligibility, tipoDeConexao: ConnectionTypeEnum.monoPhase})
    expect(response).toEqual(outputEligibility)
  });
  test("Should be return data eligibility with threePhase", () => {
    const response = eligibilityCriteria({...inputEligibility, tipoDeConexao: ConnectionTypeEnum.threePhase})
    expect(response).toEqual(outputEligibility)
  });
});

describe("Eligibility - Variations of reasons for ineligibility", () => {
  test("Should return 'Consumption Classes' error", () => {
    const outputIneligible:OutputCriteria = {
      elegivel: false,
      razoesDeInelegibilidade: [
        consumptionClassesError,
        consumptionSubClassesError
      ]
    }
    expect(() => eligibilityCriteria(
      { ...inputEligibility, classeDeConsumo: ConsumptionClassesEnum.rural }
    )).toThrow(expect.objectContaining(outputIneligible))
  });

  test("Should return 'Tariff Modality' error", () => {
    const outputIneligible:OutputCriteria = {
      elegivel: false,
      razoesDeInelegibilidade: [
        "Modalidade tarifária não aceita"
      ]
    }
    expect(() => eligibilityCriteria(
      { ...inputEligibility, modalidadeTarifaria: TariffModalitiesEnum.green }
    )).toThrow(expect.objectContaining(outputIneligible))
  });

  test("Should return 'Invalid document' error", () => {
    const outputIneligible:OutputCriteria = {
      elegivel: false,
      razoesDeInelegibilidade: [
        documentInvalidError
      ]
    }
    expect(() => eligibilityCriteria(
      { ...inputEligibility, numeroDoDocumento: "69071147000178" }
    )).toThrow(expect.objectContaining(outputIneligible))
  });

  test("Should return 'Minimum Customer Consumption' error", () => {
    const outputIneligible:OutputCriteria = {
      elegivel: false,
      razoesDeInelegibilidade: [
        "Consumo muito baixo para tipo de conexão"
      ]
    }
    expect(() => eligibilityCriteria(
      { ...inputEligibility, historicoDeConsumo: [300, 300] }
    )).toThrow(expect.objectContaining(outputIneligible))
  });
});

describe("Eligibility - CO² calculation variations", () => {
  test("Should calculate 'economiaAnualDeCO2' with projection with fewer items than the maximum", () => {
    const response = eligibilityCriteria(inputEligibility)

    expect(response.economiaAnualDeCO2).toEqual(5553.24)
  });
  
  test("Should calculate 'economiaAnualDeCO2' with projection with fewer items than the maximum - variation with exact values", () => {
    const response = eligibilityCriteria({
      ...inputEligibility,
      historicoDeConsumo: [
        600,
        600,
        600,
        600
      ]
    })
    expect(response.economiaAnualDeCO2).toEqual(604.8)
  });

  test("Should calculate 'economiaAnualDeCO2' with projection with fewer items than the maximum - variation with varying values", () => {
    const response = eligibilityCriteria({
      ...inputEligibility,
      historicoDeConsumo: [
        873,
        750,
        698,
        732,
        563
      ]
    })
    
    expect(response.economiaAnualDeCO2).toEqual(728.9856000000001)
  });
});