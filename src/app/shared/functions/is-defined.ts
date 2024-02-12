export const isDefined = <T = unknown>(value: T | undefined | null): value is T =>
  value !== null && value !== undefined;
