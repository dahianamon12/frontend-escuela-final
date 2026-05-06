import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly snack = inject(MatSnackBar);

  readonly loading = signal(false);

  readonly loginForm = this.fb.nonNullable.group({
    nombre_usuario: ['', Validators.required],
    contrasena: ['', Validators.required],
  });

  ingresar(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const body = this.loginForm.getRawValue();

    this.http.post<any>(`${environment.apiUrl}/usuarios/login`, body).subscribe({
      next: (usuario) => {
        this.loading.set(false);
        localStorage.setItem('auth', 'true');
        localStorage.setItem('user', JSON.stringify(usuario));
        localStorage.setItem('pos_audit_usuario_id', usuario.id_usuario);
        this.router.navigate(['/app']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        const msg = err.error?.detail ?? 'Error al iniciar sesion';
        this.snack.open(msg, 'Cerrar', { duration: 4000 });
      },
    });
  }
}