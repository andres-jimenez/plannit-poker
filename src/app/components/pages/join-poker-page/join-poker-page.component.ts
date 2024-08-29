import { Component } from '@angular/core';
import { CreateUserFormComponent } from '../../molecules/create-user-form/create-user-form.component';

@Component({
  selector: 'app-join-poker-page',
  standalone: true,
  imports: [CreateUserFormComponent],
  templateUrl: './join-poker-page.component.html',
  styleUrl: './join-poker-page.component.scss',
})
export class JoinPokerPageComponent {}
