import { Component } from '@angular/core';
import { CreatePokerFormComponent } from '../../molecules/create-poker-form/create-poker-form.component';
import { JoinTemplateComponent } from '../../templates/join-template/join-template.component';

@Component({
  standalone: true,
  imports: [CreatePokerFormComponent, JoinTemplateComponent],
  templateUrl: './create-poker-page.component.html',
  styleUrl: './create-poker-page.component.scss',
})
export class CreatePokerPageComponent {}
