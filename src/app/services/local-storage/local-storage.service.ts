import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  save(key: string, data: object): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key: string): string | object | null {
    const dataString = localStorage.getItem(key);

    if (!dataString) return null;

    return JSON.parse(dataString);
  }
}
