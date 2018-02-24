import {Actions, Effect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as AuthAcitons from './auth.actions';
import {fromPromise} from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';
import 'rxjs/add/operator/mergeMap';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
    .ofType(AuthAcitons.TRY_SIGNUP)
    .map((action: AuthAcitons.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: { username: string, password: string }) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      return [
        {
          type: AuthAcitons.SIGNUP
        },
        {
          type: AuthAcitons.SET_TOKEN,
          payload: token
        }
      ];
    });

  @Effect()
  authSignin = this.actions$
    .ofType(AuthAcitons.TRY_SIGNIN)
    .map((action: AuthAcitons.TrySignin) => {
      return action.payload;
    })
    .switchMap((authData: { username: string, password: string }) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthAcitons.SIGNIN
        },
        {
          type: AuthAcitons.SET_TOKEN,
          payload: token
        }
      ];
    });


  constructor(private actions$: Actions, private router: Router) {
  }
}
