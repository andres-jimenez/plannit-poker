import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-join-template',
  standalone: true,
  templateUrl: './join-template.component.html',
  styleUrl: './join-template.component.scss',
})
export class JoinTemplateComponent {
  @Input() title: string = '';
}
