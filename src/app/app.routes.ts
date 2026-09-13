import { Routes } from '@angular/router';
import { authGuard } from '@src/app/core/guards/auth.guard';
import { guestGuard } from '@src/app/core/guards/guest.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('@src/app/features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'foro',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@src/app/features/forum/forum.component').then((m) => m.ForumComponent),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
