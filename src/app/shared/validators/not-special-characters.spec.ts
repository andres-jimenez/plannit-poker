import { notSpecialCharacters } from './not-special-characters.validator';

describe('notSpecialCharacters', () => {
  it('should return false for strings with special characters', () => {
    expect(notSpecialCharacters('hola_mundo')).toBeTrue();
    expect(notSpecialCharacters('carac/special')).toBeTrue();
    expect(notSpecialCharacters('Sprint #33')).toBeTrue();
  });

  it('should return true for strings without special characters', () => {
    expect(notSpecialCharacters('hola mundo')).toBeFalse();
    expect(notSpecialCharacters('texto123')).toBeFalse();
    expect(notSpecialCharacters('Sprint 33')).toBeFalse();
  });
});
