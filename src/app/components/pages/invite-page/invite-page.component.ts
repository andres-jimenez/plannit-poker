import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { APP_ROUTES } from '../../../constants/app-routes';
import { LOCAL_STORAGE } from '../../../constants/local-storage';
import { CreateUserFormComponent } from '../../molecules/create-user-form/create-user-form.component';
import { JoinTemplateComponent } from '../../templates/join-template/join-template.component';

@Component({
  selector: 'app-invite-page',
  standalone: true,
  imports: [CreateUserFormComponent, JoinTemplateComponent],
  templateUrl: './invite-page.component.html',
  styleUrl: './invite-page.component.scss',
})
export class InvitePageComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const parametro = params['gameId'];

      if (parametro === '12345678') {
        this.localStorageService.save(LOCAL_STORAGE.gameData, {
          name: 'Sprint 5',
        });
      } else {
        this.router.navigate([APP_ROUTES.home]);
      }
    });
  }
}
