import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './userslice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
