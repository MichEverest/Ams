import { Routes } from '@angular/router';
import { ComprasComponent } from './Page/Compras/compras.component';
import { LoginComponent } from './Page/login/login.component';
import { RegisterComponent } from './Page/Register/registro.component';

export const routes: Routes = [
  { path: '', component: ComprasComponent },
  { path: 'compras', component: ComprasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];