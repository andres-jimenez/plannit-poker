import { lessThanThreeNumbers } from './less-than-three-numbers.validator';

describe('lessThanThreeNumbers', () => {
  it('should return false if there are no digits', () => {
    expect(lessThanThreeNumbers('')).toBeFalse();
    expect(lessThanThreeNumbers('abc')).toBeFalse();
  });

  it('should return false if there are three or fewer digits', () => {
    expect(lessThanThreeNumbers('123')).toBeFalse();
    expect(lessThanThreeNumbers('a1b2c3')).toBeFalse();
  });

  it('should return true if there are more than three digits', () => {
    expect(lessThanThreeNumbers('1234')).toBeTrue();
    expect(lessThanThreeNumbers('a1b2c3d4')).toBeTrue();
  });
});
