import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  
  loading = false;

  submit() {
    if (this.form.invalid) return;

    this.loading = true;

    const credenciales = {
      email: this.form.value.email ?? '',
      password: this.form.value.password ?? ''
    };

    this.authService.login(credenciales).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/compras']);
        }
      },
      error: (err) => {
        this.loading = false;
        alert('Error: Credenciales incorrectas');
      }
    });
  }
}