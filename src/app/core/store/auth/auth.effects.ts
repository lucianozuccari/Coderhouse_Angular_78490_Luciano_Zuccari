import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as AuthActions from './auth.actions';
import { API_URL } from '../../utils/constants';
import { User } from '../../services/auth/model/User';

@Injectable()
export class AuthEffects {
  private usersUrl = `${API_URL}/users`;

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ usernameOrEmail, password }) => {
        console.log('[AuthEffects] login action received');
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
          map((user) => {
            localStorage.setItem('token', user.email);
            return AuthActions.loginSuccess({ payload: user });
          }),
          catchError((error) => {
            console.error('Error durante el login:', error);
            return of(AuthActions.loginFailure({ error: error.message }));
          })
        );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.router.navigate(['dashboard']);
        })
      ),
    { dispatch: false }
  );

  checkStoredToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkStoredToken),
      switchMap(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          return of(AuthActions.checkStoredTokenFailure());
        }

        return this.http.get<User[]>(this.usersUrl).pipe(
          map((users) => {
            const user = users.find((user) => user.email === token);
            if (!user) {
              throw new Error('Token inválido');
            }
            return AuthActions.checkStoredTokenSuccess({ payload: user });
          }),
          catchError(() => {
            localStorage.removeItem('token');
            return of(AuthActions.checkStoredTokenFailure());
          })
        );
      })
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('token');
          this.router.navigate(['login']);
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}
