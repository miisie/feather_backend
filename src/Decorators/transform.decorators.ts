import { Transform } from 'class-transformer';
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function Trim() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim();
    }
    return value;
  });
}

export function ToBoolean(): PropertyDecorator {
  return Transform(
    (params) => {
      switch (params.value) {
        case 'true': {
          return true;
        }

        case 'false': {
          return false;
        }

        default: {
          return params.value;
        }
      }
    },
    { toClassOnly: true },
  );
}

export function IsArrayOfStrings(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isArrayOfStrings',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            Array.isArray(value) &&
            value.every((element) => typeof element === 'string')
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an array of strings`;
        },
      },
    });
  };
}

export function IsText(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isText',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'string';
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a text`;
        },
      },
    });
  };
}

export function IsEnumValue(enumType: object, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEnumValue',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return Object.values(enumType).includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be one of the valid enum values`;
        },
      },
    });
  };
}
