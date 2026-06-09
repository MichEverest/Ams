import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  
  private usuariosSubject = new BehaviorSubject<any[]>([]);
  usuarios$ = this.usuariosSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
  currentUser$ = this.currentUserSubject.asObservable();

  cargarUsuarios() {
    return this.http.get<any[]>('http://localhost:8080/api/usuarios').pipe(
      tap(data => this.usuariosSubject.next(data))
    );
  }

  updateUser(userData: any) {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    this.currentUserSubject.next(userData);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}