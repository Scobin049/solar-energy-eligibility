import { ArrayMaxSize, ArrayMinSize, IsArray, IsDefined, IsEnum, IsNumberString, Max, Min, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { ConnectionTypeEnum, ConsumptionClassesEnum, TariffModalitiesEnum } from "../enums/service-criteria.enum";
import { InputCriteria } from "../interfaces/input-criteria.interface";

export function IsStringLength(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStringLengthConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'isStringLength', async: false })
export class IsStringLengthConstraint implements ValidatorConstraintInterface {
  validate(value: string) {
    // Verifica se o comprimento da string é 11 ou 14
    return value.length === 11 || value.length === 14;
  }

  defaultMessage() {
    return 'A propriedade "numeroDoDocumento" deve ter exatamente 11 ou 14 caracteres numéricos.'
  }
}

export class InputCriteriaDTO implements InputCriteria {
  @IsNumberString()
  @IsStringLength()
  @IsDefined()
  numeroDoDocumento: string;
  
  @IsEnum(ConnectionTypeEnum)
  @IsDefined()
  tipoDeConexao: ConnectionTypeEnum;
  
  @IsEnum(ConsumptionClassesEnum)
  @IsDefined()
  classeDeConsumo: ConsumptionClassesEnum;
  
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



