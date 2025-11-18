import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../utils/constants';
import { User } from './model/User';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { setAuthUser, clearAuthUser } from '../../store/auth/auth.actions';
import { selectUser, selectIsAuth } from '../../store/auth/auth.selector';
import { RootState } from '../../store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersUrl = `${API_URL}/users`;

  user$: Observable<any>;
  isAuthenticated$: Observable<boolean>;

  constructor(private http: HttpClient, private router: Router, private store: Store<RootState>) {
    this.user$ = this.store.select(selectUser);
    this.isAuthenticated$ = this.store.select(selectIsAuth);

    this.checkStoredToken();
  }

  private checkStoredToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.getUserByToken(token).subscribe({
        next: (user) => {
          this.store.dispatch(setAuthUser({ payload: user }));
        },
        error: () => {
          localStorage.removeItem('token');
        },
      });
    }
  }

  private getUserByToken(token: string): Observable<User> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map((users) => {
        const user = users.find((user) => user.email === token);
        if (!user) {
          throw new Error('Token inválido');
        }
        return user;
      })
    );
  }

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

        return user;
      }),
      tap((user) => {
        localStorage.setItem('token', user.email);
        this.store.dispatch(setAuthUser({ payload: user }));
        this.router.navigate(['dashboard']);
      }),
      catchError((error) => {
        console.error('Error durante el login:', error);
        if (
          error.message === 'Usuario o email inválido' ||
          error.message === 'Contraseña inválida'
        ) {
          return throwError(() => error);
        }
        return throwError(() => new Error('Error de conexión al servidor'));
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.store.dispatch(clearAuthUser());
    this.router.navigate(['login']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$;
  }

  getCurrentUser(): User | null {
    let currentUser: User | null = null;
    this.user$.subscribe((user) => (currentUser = user)).unsubscribe();
    return currentUser;
  }

  isCurrentlyAuthenticated(): boolean {
    let isAuth = false;
    this.isAuthenticated$.subscribe((auth) => (isAuth = auth)).unsubscribe();
    return isAuth;
  }
}
