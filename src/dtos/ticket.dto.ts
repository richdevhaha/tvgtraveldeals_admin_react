import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  Min,
  NotEquals,
  ValidateNested,
  ValidateIf 
} from "class-validator";
import { Type } from "class-transformer";
import { BOOKING_TYPE, STATUS } from "../types";
import { IsGreaterThanProps } from "../utils/class-validator";

export class OpenHourDto {
  @IsNotEmpty()
  @IsNumber()
  public day: number;

  @IsNotEmpty()
  @IsString()
  public startTime: string;

  @IsNotEmpty()
  @IsString()
  @IsGreaterThanProps("startTime", { message: "End time must be great than Start time" })
  public endTime: string;

  @IsNotEmpty()
  @IsBoolean()
  public isActive: boolean;
}

// export class PricingTierDto  {
//   @IsNotEmpty()
//   @IsNumber()
//   public day: number;

//   @IsNotEmpty()
//   @IsNumber()
//   public rate: number;
// }

export class closingDate {
  @IsNotEmpty()
  @IsString()
  public startDate: string;

  @IsNotEmpty()
  @IsString()
  @IsGreaterThanProps("startTime", { message: "End time must be great than Start time" })
  public endDate: string;
}

export class coupon {
  @IsNotEmpty()
  @IsBoolean()
  public isActive: boolean;

  @IsNotEmpty()
  @IsString()
  public discountType: string;
  
  @IsNotEmpty()
  @IsString()
  public expireType: string;

  @IsNotEmpty()
  @IsString()
  public value: string;

  @IsNotEmpty()
  @IsString()
  public code: string;

  @IsNotEmpty()
  @IsString()
  public startDate: string;

  @IsNotEmpty()
  @IsString()
  @IsGreaterThanProps("startTime", { message: "End time must be great than Start time" })
  public endDate: string;
}

export class barcode {
  @IsNotEmpty()
  @IsString()
  public activeDate: string;
}

export class discount {
  @IsNotEmpty()
  @IsBoolean()
  public isActive: boolean;

  @IsNotEmpty()
  @IsString()
  public value: string;

  @IsNotEmpty()
  @IsString()
  public startDate: string;

  @IsNotEmpty()
  @IsString()
  @IsGreaterThanProps("startTime", { message: "End time must be great than Start time" })
  public endDate: string;
}

export class IncludeItemDto {
  @IsNotEmpty()
  @IsBoolean()
  public isActive: boolean;

  @IsNotEmpty()
  @IsString()
  public content: string;
}

export class LocationItemDto {
  @IsNotEmpty()
  @IsString()
  public address: string;

  // @IsNotEmpty()
  // @IsString()
  @IsUrl({}, { message: "Invalid Address url provided." })
  public link: string;
}

export class StringDto {
  @IsNotEmpty()
  @IsString()
  public content: string;
}

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @IsPositive()
  @NotEquals(0)
  public price: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  public childPrice: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  public seniorPrice: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  public infantPrice: number;

  @IsNotEmpty()
  @IsBoolean()
  public isWeekendPrice: boolean;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @IsPositive()
  @NotEquals(0)
  @ValidateIf((object, value) => object.isWeekendPrice === true)
  public weekendPrice: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ValidateIf((object, value) => object.isWeekendPrice === true)
  public weekendChildPrice: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ValidateIf((object, value) => object.isWeekendPrice === true)
  public weekendSeniorPrice: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ValidateIf((object, value) => object.isWeekendPrice === true)
  public weekendInfantPrice: number;

  @IsString()
  @IsNotEmpty()
  public currency: string;

  @IsEnum(BOOKING_TYPE, { message: "Invalid booking type provided." })
  @IsNotEmpty()
  public bookingType: BOOKING_TYPE;

  @IsOptional()
  // @IsUrl({}, { message: "Invalid affiliate link provided." })
  public affiliateLink: string;

  @IsBoolean()
  public isFeatured: boolean;

  @IsBoolean()
  public isLikelySell: boolean;

  @IsString()
  @IsNotEmpty()
  public destination: string;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  public images: string[];

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(5)
  @IsPositive()
  @NotEquals(0)
  public reviewMark: number;

  @IsNumber()
  @IsNotEmpty()
  public reviewCount: number;

  @IsString()
  @IsNotEmpty()
  public reviewID: string;

  @IsString()
  @IsNotEmpty()
  public overview: string;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  public highlights: string[];

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  public instructions: string[];

  @IsArray()
  @ValidateNested({ each: true, message: "Invalid openning hour array provided." })
  @ArrayMinSize(1)
  @Type(() => OpenHourDto)
  public openingHours: OpenHourDto[];

  // @IsArray()
  // @Type(() => PricingTierDto)
  // public pricingTiers: PricingTierDto[];

  @IsArray()
  @ValidateNested({ each: true, message: "Invalid includes array provided." })
  @ArrayMinSize(1)
  @Type(() => IncludeItemDto)
  public includes: IncludeItemDto[];

  @IsObject()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => LocationItemDto)
  public location: LocationItemDto;

  @IsUrl({}, { message: "Invalid video url provided." })
  @IsNotEmpty()
  public videoUrl: string;

  @IsBoolean()
  public isShowHome: boolean;

  @IsBoolean()
  public isTopActivity: boolean;

  @IsBoolean()
  public isTopCategory: boolean;

  @IsEnum(STATUS, { message: "Invalid status provided." })
  @IsNotEmpty()
  public status: STATUS;

  @IsString()
  @IsNotEmpty()
  public qrCodeGenerationType: string;

  @IsArray()
  // @ValidateNested({ each: true, message: "Invalid closing hour array provided." })
  @Type(() => closingDate)
  public closingDate: closingDate[];

  @IsArray()
  @Type(() => coupon)
  public coupon: coupon[];

  @Type(() => discount)
  public discount: discount;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsNotEmpty({ each: true })
  public timeSlots: string[];
}

export class UpdateTicketDto extends CreateTicketDto {
  // @ArrayNotEmpty()
  // @IsArray()
  // @ArrayMinSize(1)
  // @IsNotEmpty({ each: true })
  // public images: string[];

  @IsOptional()
  @IsArray()
  public removedImages: string[];
}
