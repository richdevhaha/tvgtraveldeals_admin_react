import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { STATUS } from "../types";

export class CreateDestinationDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  public logo: string;

  @IsOptional()
  @IsNumber()
  public order: number;

  @IsEnum(STATUS, { message: "Invalid status" })
  @IsNotEmpty()
  public status: STATUS;
}

export class UpdateDestinationDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  public logo: string;

  @IsOptional()
  @IsNumber()
  public order: number;

  @IsEnum(STATUS, { message: "Invalid status" })
  @IsNotEmpty()
  public status: STATUS;
}
