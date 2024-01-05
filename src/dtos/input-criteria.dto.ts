import { ArrayMaxSize, ArrayMinSize, IsArray, IsDefined, IsEnum, IsNumberString, Max, Min } from "class-validator";
import { ConnectionTypeEnum, ConsumptionClassesEnum, TariffModalitiesEnum } from "../enums/service-criteria.enum";
import { InputCriteria } from "../interfaces/input-criteria.interface";

export class InputCriteriaDTO implements InputCriteria {
  @IsNumberString()
  @IsDefined()
  numeroDoDocumento: string;
  
  @IsEnum(ConnectionTypeEnum)
  @IsDefined()
  tipoDeConexao: ConnectionTypeEnum;
  
  @IsEnum(ConsumptionClassesEnum)
  @IsDefined()
  classeDeConsumo: ConsumptionClassesEnum;

  @IsDefined()
  subclasseDeConsumo: string;
  
  @IsEnum(TariffModalitiesEnum)
  @IsDefined()
  modalidadeTarifaria: TariffModalitiesEnum;
  
  @IsDefined()
  @ArrayMinSize(3)
  @ArrayMaxSize(12)
  @IsArray()
  @Min(0, {each: true})
  @Max(9999, {each: true})
  historicoDeConsumo: number[];

}



