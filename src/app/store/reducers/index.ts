import {createFeatureSelector, MetaReducer} from '@ngrx/store';
import {reducer as authreducer, State as AuthState,} from './authentification.reducer';
import {environment} from "../../../environments/environment";

export interface State {
  authenticationState: AuthState;
}

export const reducers = {
  authentication: authreducer,
};

export const metaReducers = !environment.production ? [] : []; //todo à revoir

export const selectAuthenticationState = createFeatureSelector<State>('authentication');
