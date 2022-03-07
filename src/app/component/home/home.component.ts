import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../../models/user';
import {selectAuthenticationState, State} from "../../store/reducers";
import {logout} from "../../store/actions/authentification.actions";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User | undefined;
  getState: Observable<any>;
  isAuthenticated: boolean = false;

  constructor(private store: Store<State>) {
    this.getState = this.store.select(selectAuthenticationState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
      this.user = state.user;
    });
  }

  logout(): void {
    this.store.dispatch(logout());
  }

}
