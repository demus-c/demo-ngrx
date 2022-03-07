import {User} from '../../models/user';
import {Action, createReducer, on} from "@ngrx/store";
import {login, loginFailure, loginSuccess, logout} from "../actions/authentification.actions";

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

//set the initial state with localStorage
export const initialState: State = {
  isAuthenticated: localStorage.getItem('token') !== null,
  user: {
    token: localStorage.getItem('token'),
    login: localStorage.getItem('login')
  },
  errorMessage: null
};


const authReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state
  })),
  on(loginSuccess, (state, {payload}) => ({
    ...state,
    isAuthenticated: true,
    user: {
      token: payload.token,
      login: payload.login
    },
    errorMessage: null
  })),
  on(loginFailure, (state => ({
      ...state,
      isAuthenticated: false,
      errorMessage: 'Erreur couple login mdp'
    }))
  ),
  on(logout, (state => ({
      ...initialState,
    }))
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
