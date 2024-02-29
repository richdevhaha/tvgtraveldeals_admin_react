import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min, NotEquals } from "class-validator";
import { STATUS } from "../types";

export class CurrencyDto {
  @IsString()
  @IsOptional()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public symbol: string;

  @IsString()
  @IsNotEmpty()
  public country: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @IsPositive()
  @NotEquals(0)
  public rate: number;

  @IsOptional()
  @IsEnum(STATUS)
  public status: STATUS;

  // @MinLength(10, { message: "Title is too short" })
  // @MaxLength(50, { message: "Title is too long" })
  // title: string;
}
