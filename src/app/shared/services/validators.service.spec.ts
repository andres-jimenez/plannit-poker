import { TestBed } from '@angular/core/testing';
import { ValidatorsService } from './validators.service';
import { lessThanThreeNumbers } from '../validators/less-than-three-numbers.validator';
import { notOnlyNumbers } from '../validators/not-only-numbers.validator';
import { notSpecialCharacters } from '../validators/not-special-characters.validator';

describe('ValidatorsService', () => {
  let service: ValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidatorsService],
    });
    service = TestBed.inject(ValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return error if gameName is empty', () => {
    const result = service.isInvalidName('');
    expect(result.isInvalid).toBeTrue();
    expect(result.errorMessage).toBe('Este campo es requerido');
  });

  it('should return error if gameName contains more than 3 numbers', () => {
    const result = service.isInvalidName('abc1234');
    expect(result.isInvalid).toBeTrue();
    expect(result.errorMessage).toBe(
      'El nombre no puede tener mas de 3 números'
    );
  });

  it('should return error if gameName contains only numbers', () => {
    const result = service.isInvalidName('16');
    expect(result.isInvalid).toBeTrue();
    expect(result.errorMessage).toBe(
      'El nombre no puede tener solamente números'
    );
  });

  it('should return error if gameName contains special characters', () => {
    const result = service.isInvalidName('test#name');
    expect(result.isInvalid).toBeTrue();
    expect(result.errorMessage).toBe(
      'El nombre no puede contener los siguientes caracteres: _,.*#/-'
    );
  });

  it('should return error if gameName is longer than 20 characters', () => {
    const result = service.isInvalidName('a'.repeat(21));
    expect(result.isInvalid).toBeTrue();
    expect(result.errorMessage).toBe(
      'El nombre debe tener menos de 20 caracteres'
    );
  });

  it('should return error if gameName is shorter than 5 characters', () => {
    const result = service.isInvalidName('abcd');
    expect(result.isInvalid).toBeTrue();
    expect(result.errorMessage).toBe(
      'El nombre debe tener al menos 5 caracteres'
    );
  });

  it('should return valid if gameName is within all criteria', () => {
    const result = service.isInvalidName('ValidName1');
    expect(result.isInvalid).toBeFalse();
    expect(result.errorMessage).toBeNull();
  });
});
