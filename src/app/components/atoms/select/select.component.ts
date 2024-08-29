import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @Input() value: string = '';
  @Input() label: string = '';
  @Output() onChanges: EventEmitter<string> = new EventEmitter<string>();

  onSelectChanges(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.onChanges.emit(target.value);
  }
}
