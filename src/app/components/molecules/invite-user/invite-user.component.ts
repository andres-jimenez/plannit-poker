import { Component } from '@angular/core';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-invite-user',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './invite-user.component.html',
  styleUrl: './invite-user.component.scss',
})
export class InviteUserComponent {
  inviteLink: string = 'http://localhost:4200/invite?gameId=12345678';

  copyToClipboard() {
    navigator.clipboard.writeText(this.inviteLink);
  }
}
