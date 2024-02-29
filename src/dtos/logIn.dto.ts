import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LogInDto {
  @IsEmail({}, { message: "Invalid email address" })
  @IsNotEmpty({ message: "Add Email" })
  public email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty({ message: "Add Password" })
  public password: string;
}
