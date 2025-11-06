import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  accessForm: FormGroup;
  hidePassword: boolean = true;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService) {
    this.accessForm = new FormGroup({
      usernameOrEmail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false),
    });
  }

  onSubmit() {
    if (this.accessForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { usernameOrEmail, password } = this.accessForm.value;

      this.authService.login(usernameOrEmail, password).subscribe({
        next: (user) => {
          // Login exitoso, el AuthService ya maneja la navegación
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.message || 'Error al iniciar sesión';
          this.isLoading = false;
        },
      });
    } else {
      this.accessForm.markAllAsTouched();
    }
  }
}
