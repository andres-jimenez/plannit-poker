import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text: string = '';
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() disabled: boolean = false;

  handleClick(): void {
    this.onClick.emit();
  }
}
