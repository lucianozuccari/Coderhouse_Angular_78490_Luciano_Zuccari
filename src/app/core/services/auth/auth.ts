import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../utils/constants';
import { User } from './model/User';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersUrl = `${API_URL}/users`;
  user: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(usernameOrEmail: string, password: string): Observable<User> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map((users) => {
        const user = users.find(
          (user) => user.email === usernameOrEmail || user.username === usernameOrEmail
        );

        if (!user) {
          throw new Error('Usuario o email inválido');
        }

        if (user.password !== password) {
          throw new Error('Contraseña inválida');
        }

        localStorage.setItem('token', user.email);
        this.user = user;
        this.router.navigate(['dashboard']);
        return user;
      }),
      catchError((error) => {
        console.error('Error durante el login:', error);
        // Si el error ya tiene un mensaje específico (credenciales incorrectas), lo mantenemos
        if (
          error.message === 'Usuario o email inválido' ||
          error.message === 'Contraseña inválida'
        ) {
          return throwError(() => error);
        }
        // Solo para errores de conexión real
        return throwError(() => new Error('Error de conexión al servidor'));
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
    this.router.navigate(['login']);
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
