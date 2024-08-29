import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { JoinGuard } from './guards/join.guard';
import { CreatePokerPageComponent } from './components/pages/create-poker-page/create-poker-page.component';
import { PokerPageComponent } from './components/pages/poker-page/poker-page.component';
import { JoinPokerPageComponent } from './components/pages/join-poker-page/join-poker-page.component';
import { PokerGuard } from './guards/poker.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CreatePokerPageComponent,
  },
  {
    path: 'join',
    component: JoinPokerPageComponent,
    canMatch: [JoinGuard],
  },
  {
    path: 'poker',
    component: PokerPageComponent,
    canMatch: [PokerGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
