export const PORT = process.env.PORT ?? 3000

export const MAX_RECENT_VALUES = 12;
export const AVERAGE_CO2_EMISSION = 84;
export const KWH_CO2_EMISSION = 1000;

export const MIN_MONOPHASE = 400;
export const MIN_BIPHASIC = 500;
export const MIN_THREEPHASIC = 750;

export const tariffModalityError =  "Modalidade tarifária não aceita";
export const consumptionClassesError =  "Classe de consumo não aceita";
export const consumptionSubClassesError =  "Subclasse de consumo não aceita";
export const minimumCustomerConsumptionError = "Consumo muito baixo para tipo de conexão";
export const documentInvalidError = "Documento informado não é válido";

export const CPF_LENGTH = 11