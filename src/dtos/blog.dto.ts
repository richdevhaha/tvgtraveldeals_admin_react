import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { STATUS } from "../types";

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public banner: string;

  @IsString()
  @IsNotEmpty()
  public content: string;

  @IsEnum(STATUS, { message: "Invalid status" })
  @IsNotEmpty()
  public status: STATUS;
}

export class UpdateBlogDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public banner: string;

  @IsString()
  @IsNotEmpty()
  public content: string;

  @IsEnum(STATUS, { message: "Invalid status" })
  @IsNotEmpty()
  public status: STATUS;
}
