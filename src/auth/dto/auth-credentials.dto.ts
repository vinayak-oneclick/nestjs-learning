import { IsString, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4, {message: 'minimum 4 character required'})
    @MaxLength(20, {message: 'maximum 20 character required'})
    username: string;

    @IsString()
    @MinLength(4, {message: 'minimum 4 character required'})
    @MaxLength(20, {message: 'minimum 20 character required'})
    password: string;
}