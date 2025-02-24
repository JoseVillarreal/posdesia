//validation for poem class using class-validator library

import { IsString } from "class-validator";

export default class Poem {
  @IsString()
  title!: string;

  @IsString()
  poem!: string;

  @IsString()
  author!: string;
}
