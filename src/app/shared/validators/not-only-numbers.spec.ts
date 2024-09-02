import { notOnlyNumbers } from './not-only-numbers.validator';

describe('notOnlyNumbers', () => {
  it('should return false for strings with non-numeric characters', () => {
    expect(notOnlyNumbers('abc')).toBeFalse();
    expect(notOnlyNumbers('a1b2c3')).toBeFalse();
    expect(notOnlyNumbers('!@#')).toBeFalse();
  });

  it('should return true for strings with only numeric characters', () => {
    expect(notOnlyNumbers('123')).toBeTrue();
    expect(notOnlyNumbers('000')).toBeTrue();
    expect(notOnlyNumbers('456789')).toBeTrue();
  });

  it('should accept empty strings', () => {
    expect(notOnlyNumbers('')).toBeFalse();
  });
});
