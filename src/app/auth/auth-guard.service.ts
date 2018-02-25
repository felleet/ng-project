import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private  store: Store<fromApp.AppState>) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.store.select( (authState: fromApp.AppState) => authState.auth.authenticated);
    return this.store.select('auth').take(1).map((authState: fromAuth.State) => authState.authenticated);
  }

}
