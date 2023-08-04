import { errors } from '@strapi/utils/lib';

export const getApplicationError = (message: string) => {
  return new errors.ApplicationError(message);
};

export const getValidationError = (message: string) => {
  return new errors.ValidationError(message);
};

export const getUnauthorizedError = (message?: string) => {
  return new errors.UnauthorizedError(message);
};

export const getTokenExpiredError = () => {
  return new errors.UnauthorizedError('ID token has expired.');
};
