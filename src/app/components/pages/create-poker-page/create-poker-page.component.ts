import { Component } from '@angular/core';
import { CreatePokerFormComponent } from '../../molecules/create-poker-form/create-poker-form.component';
import { CreateUserFormComponent } from '../../molecules/create-user-form/create-user-form.component';

@Component({
  standalone: true,
  imports: [CreatePokerFormComponent, CreateUserFormComponent],
  templateUrl: './create-poker-page.component.html',
  styleUrl: './create-poker-page.component.scss',
})
export class CreatePokerPageComponent {}
