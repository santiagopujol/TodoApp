import React from 'react';
import { Login } from './components/login/Login';
import { Todo } from './components/todo/Todo';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setUserLogged } from './redux/slices/user/userSlice';
import { AppContextProvider } from './context.js';

function App() {
  const dispatch = useDispatch()

  const userLogged = localStorage.getItem("userLogged") !== null 
    ? JSON.parse(localStorage.getItem("userLogged")) 
    : null;

  dispatch(setUserLogged(userLogged));

  return (
    <AppContextProvider>
      <Router>
          <Routes>
            {!userLogged
              ? 
              <Route path="/" element={<Navigate to="login" />} /> 
              : 
              <Route path="/" element={<Navigate to="todo" />} /> 
            }
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/todo" element={<Todo />} />
          </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;