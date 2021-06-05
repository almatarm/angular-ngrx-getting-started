import { createReducer, on, createAction, createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../user';

interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
);

const userReducer = createReducer(
  initialState,
  on(createAction('[User] Mask User Name'), state => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    };
  })
);

export {
  UserState,
  userReducer,
  getMaskUserName,
  getCurrentUser
}
