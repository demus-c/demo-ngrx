import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {login} from "../../store/actions/authentification.actions";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {selectAuthenticationState, State} from "../../store/reducers";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  getState: Observable<any>;
  errorMessage: string | null = null;
  loginForm!: FormGroup;

  constructor(private store: Store<State>, private fb: FormBuilder) {
    this.createLoginForm();
    this.getState = this.store.select(selectAuthenticationState);
  }

  ngOnInit() {
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
  const actionPayload: any = {
      login: this.loginForm.get('login')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.store.dispatch(login({payload: actionPayload}));
  }

}
