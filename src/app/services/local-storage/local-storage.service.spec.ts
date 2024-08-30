import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

const testKey = 'testKey';
const testData = { name: 'Andrés', type: 'player' };

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save data', () => {
    service.save(testKey, testData);

    const storedData = localStorage.getItem(testKey);
    expect(storedData).toBeTruthy();
    expect(JSON.parse(storedData!)).toEqual(testData);
  });

  it('should retrieve data', () => {
    localStorage.setItem(testKey, JSON.stringify(testData));

    const retrievedData = service.get(testKey);
    expect(retrievedData).toEqual(testData);
  });

  it('should delete data', () => {
    localStorage.setItem(testKey, JSON.stringify(testData));

    service.delete(testKey);

    const deletedData = localStorage.getItem(testKey);

    expect(deletedData).toBeNull();
  });
});
