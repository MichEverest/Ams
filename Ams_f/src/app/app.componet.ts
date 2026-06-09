// navbar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="main-nav">
      <a routerLink="/compras">Tienda</a>
      
      <a *ngIf="esAdmin()" routerLink="/admin" class="admin-link">Panel Admin</a>
      
      <button (click)="logout()">Salir</button>
    </nav>
  `
})
export class NavbarComponent {
  esAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user?.role === 'ADMIN';
  }
  logout() { /* lógica de logout */ }
}