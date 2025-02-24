import { IsNumber, isNumber, isString } from "class-validator";

export default class Annotation {
  @IsNumber()
  poem!: number;

  @isNumber()
  linePosition!: number;

  @isString()
  message!: string;
}
