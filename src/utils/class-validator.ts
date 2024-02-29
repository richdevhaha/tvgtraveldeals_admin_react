import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export const IsGreaterThan =
  (threshold: number, validationOptions?: ValidationOptions) => (object: object, propertyName: string) => {
    registerDecorator({
      name: "isGreaterThan",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [threshold],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === "number" && value > threshold;
        },
      },
    });
  };

/**
 * @IsGreaterThanProps('minValue', {
    message: 'maxValue must be larger than minValue',
  })
 * @param property 
 * @param validationOptions 
 * @returns 
 */
export const IsGreaterThanProps =
  (property: string, validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      name: "isGreaterThanProps",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          // return typeof value === "number" && typeof relatedValue === "number" && value > relatedValue;
          return value > relatedValue;
        },
      },
    });
  };

export const IsGreaterNumThanProps =
  (property: string, validationOptions?: ValidationOptions) => (object: Object, propertyName: string) => {
    registerDecorator({
      name: "isGreaterThanProps",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return typeof value === "number" && typeof relatedValue === "number" && value > relatedValue;
        },
      },
    });
  };

export const IsSmallerThan =
  (threshold: number, validationOptions?: ValidationOptions) => (object: object, propertyName: string) => {
    registerDecorator({
      name: "isSmallerThan",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [threshold],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === "number" && value < threshold;
        },
      },
    });
  };

export const IsSmallerThanProps =
  (threshold: number, validationOptions?: ValidationOptions) => (object: object, propertyName: string) => {
    registerDecorator({
      name: "IsSmallerThanProps",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [threshold],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value < relatedValue;
        },
      },
    });
  };

export const IsSmallerNumThanProps =
  (threshold: number, validationOptions?: ValidationOptions) => (object: object, propertyName: string) => {
    registerDecorator({
      name: "IsSmallerThanProps",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [threshold],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return typeof value === "number" && typeof relatedValue === "number" && value < relatedValue;
        },
      },
    });
  };
