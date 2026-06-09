import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'auth-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  loading = false;

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  onRegister() {
    if (this.registerForm.invalid) return;

    const { password, confirmPassword } = this.registerForm.value;
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.loading = true;

    this.http.post('http://localhost:8080/api/auth/register', this.registerForm.value)
      .subscribe({
        next: (response) => {
          console.log('Registro exitoso en el backend', response);
          this.loading = false;
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error en el registro:', err);
          alert(err.error?.message || 'Error al registrar el usuario');
          this.loading = false;
        }
      });
  }
}