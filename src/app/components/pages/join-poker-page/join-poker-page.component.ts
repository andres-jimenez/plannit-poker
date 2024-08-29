import { Component } from '@angular/core';
import { CreateUserFormComponent } from '../../molecules/create-user-form/create-user-form.component';
import { JoinTemplateComponent } from '../../templates/join-template/join-template.component';

@Component({
  selector: 'app-join-poker-page',
  standalone: true,
  imports: [CreateUserFormComponent, JoinTemplateComponent],
  templateUrl: './join-poker-page.component.html',
  styleUrl: './join-poker-page.component.scss',
})
export class JoinPokerPageComponent {}
