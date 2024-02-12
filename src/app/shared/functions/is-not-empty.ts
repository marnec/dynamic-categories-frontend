import { isDefined } from './is-defined';

export const isNotEmpty = (value: unknown | unknown[]): boolean => {
  if (!isDefined(value)) {
    return false;
  }

  if (typeof value === 'string') {
    return !!value;
  }

  if (typeof value === 'object') {
    return Object.keys(value!).length > 0;
  }

  return true;
};
