import { IsEmail, IsString } from "class-validator";

export class SigninDTO {
    @IsEmail()
    email: string;
    @IsString()
    username: string;
    @IsString()
    password: string;
}