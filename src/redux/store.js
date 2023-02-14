import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from './slices/user/userSlice'
import todoReducer from './slices/todo/todoSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    todo: todoReducer,
  },
});