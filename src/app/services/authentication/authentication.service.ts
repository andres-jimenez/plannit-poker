import { Injectable } from '@angular/core';

const token = '980c5c9f-bbf7-444a-8ec7-7e7b09845670';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  login = (userName: string) => {
    return {
      userName,
      token,
    };
  };

  validateToken = (myToken: string) => {
    return myToken === token;
  };
}
