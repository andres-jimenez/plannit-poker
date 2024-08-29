import { Injectable } from '@angular/core';
import { lessThanThreeNumbers } from '../validators/less-than-three-numbers.validator';
import { notOnlyNumbers } from '../validators/not-only-numbers.validator';
import { notSpecialCharacters } from '../validators/not-special-characters.validator';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  public isInvalidName = (
    gameName: string
  ): {
    isInvalid: boolean;
    errorMessage: string | null;
  } => {
    if (!gameName)
      return {
        isInvalid: true,
        errorMessage: 'Este campo es requerido',
      };

    if (lessThanThreeNumbers(gameName))
      return {
        isInvalid: true,
        errorMessage: 'El nombre no puede tener mas de 3 números',
      };

    if (notOnlyNumbers(gameName))
      return {
        isInvalid: true,
        errorMessage: 'El nombre no puede tener solamente números',
      };

    if (notSpecialCharacters(gameName))
      return {
        isInvalid: true,
        errorMessage:
          'El nombre no puede contener los siguientes caracteres: _,.*#/-',
      };

    if (gameName.length > 20)
      return {
        isInvalid: true,
        errorMessage: 'El nombre debe tener menos de 20 caracteres',
      };

    if (gameName.length < 5)
      return {
        isInvalid: true,
        errorMessage: 'El nombre debe tener al menos 5 caracteres',
      };

    return { isInvalid: false, errorMessage: null };
  };
}
