import { IsEmail, IsMobilePhone, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class userRegisterDTO {
    @IsString()
    document: string;
    
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    lastname: string;

    @IsMobilePhone("es-CO")
    phone: string;

    @IsOptional()
    @IsPhoneNumber("CO")
    secondaryPhone: string;
}