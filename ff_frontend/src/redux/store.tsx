import countriesReducer from './countriesReducer';
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersReducer';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    users: usersReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch