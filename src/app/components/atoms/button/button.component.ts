import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type buttonVariant = 'white' | 'purple' | 'transparent';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() variant: buttonVariant = 'white';
  @Input() text: string = '';
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() disabled: boolean = false;

  handleClick(): void {
    this.onClick.emit();
  }
}
