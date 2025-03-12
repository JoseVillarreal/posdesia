import { IsString, isString } from "class-validator";

export default class Comment {
  @IsInt()
  userId!: number;

  @IsString()
  message!: string;
}
