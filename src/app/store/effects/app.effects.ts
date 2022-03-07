import {Injectable} from '@angular/core';
import {mergeMap, of} from 'rxjs';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.services';
import * as AuthenticationAction from '../actions/authentification.actions'
import {loginFailure, loginSuccess} from "../actions/authentification.actions";
import {User} from "../../models/user";

@Injectable()
export class AppEffects {


  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  login$= createEffect(() => this.actions$.pipe(
    ofType(AuthenticationAction.login),
    map((action:any) => {
      return action.payload;
    }),
    mergeMap((payload:any) => {
      return this.authenticationService.login(payload.login, payload.password)
        .pipe(
          map((user: User) => {
            return loginSuccess({payload:
                {login: payload.login, token: user.token}
            })
          }),
          catchError(error => of(loginFailure({error})))
        );
    })
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthenticationAction.loginSuccess),
    tap((action: any) => {
      //when the user logs in successfully, the token and email are saved to localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('login',  action.payload.login);
      this.router.navigateByUrl('/');
    })
  ),     { dispatch: false });


  loginFailure$ = createEffect( () =>
      this.actions$.pipe(
        ofType(AuthenticationAction.loginFailure)
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthenticationAction.logout),
      tap((user) => {
        //when the user log out the token and email are removed from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('login');
        this.router.navigateByUrl('/login');
      })
    ),
    { dispatch: false }
  );

}
