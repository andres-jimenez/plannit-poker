import { Injectable } from '@angular/core';
import { Observable, of, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokerService {
  private users = [
    { name: 'Pedro', type: 'player' },
    { name: 'Juan', type: 'player' },
    { name: 'Ana', type: 'spectator' },
    { name: 'Laura', type: 'player' },
    { name: 'Carlos', type: 'player' },
    { name: 'Maria', type: 'spectator' },
    { name: 'Luis', type: 'player' },
  ];

  constructor() {}

  getUsers(): Observable<{ name: string; type: string }> {
    return timer(0, 2000).pipe(
      switchMap((index) => {
        const userIndex = index % this.users.length;
        return of(this.users[userIndex]);
      })
    );
  }
}
