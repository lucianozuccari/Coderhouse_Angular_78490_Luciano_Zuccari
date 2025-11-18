import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnDestroy {
  accessForm: FormGroup;
  hidePassword: boolean = true;
  errorMessage: string = '';
  isLoading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private authService: AuthService) {
    this.accessForm = new FormGroup({
      usernameOrEmail: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false),
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    if (this.accessForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const { usernameOrEmail, password } = this.accessForm.value;

      this.authService
        .login(usernameOrEmail, password)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (user) => {
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
