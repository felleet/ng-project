import {Component, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {DataStorageService} from '../../shared/data-storage.service';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  authState: Observable<fromAuth.State>;

  constructor(private storage: DataStorageService,
              private store: Store<fromApp.AppState>) {
  }


  ngOnInit(): void {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.storage.storeRecipes()
      .subscribe((response: Response) => {
        console.log(response);
      });
  }

  onFetchData() {
    this.storage.getRecipes();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

}
