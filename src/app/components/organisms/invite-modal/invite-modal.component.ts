import { Component, EventEmitter, Output } from '@angular/core';
import { InviteUserComponent } from '../../molecules/invite-user/invite-user.component';

@Component({
  selector: 'app-invite-modal',
  standalone: true,
  imports: [InviteUserComponent],
  templateUrl: './invite-modal.component.html',
  styleUrl: './invite-modal.component.scss',
})
export class InviteModalComponent {
  @Output() close: EventEmitter<void> = new EventEmitter();

  onCloseModal() {
    this.close.emit();
  }
}
