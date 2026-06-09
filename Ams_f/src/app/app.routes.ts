import { Routes } from '@angular/router';
import { ComprasComponent } from './Page/Compras/compras.component';
import { LoginComponent } from './Page/login/login.component';
import { RegisterComponent } from './Page/Register/registro.component';
import { adminGuard } from './Service/admin.guard';

export const routes: Routes = [
  { path: '', component: ComprasComponent },
  { path: 'compras', component: ComprasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'admin', 
    loadComponent: () => import('../app/Admin/admin.component').then(m => m.AdminComponent),
    canActivate: [adminGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];