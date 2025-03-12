import { IsEmail, isEmail, IsString, isString } from "class-validator";

export default class User {
	@IsString()
	username!: string;

	@IsEmail()
	email!: string;
}
