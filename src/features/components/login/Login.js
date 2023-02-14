import React from 'react'
import { useDispatch } from 'react-redux'
import logo from '../../../logo.svg';
import { getUsers, setUserLogin } from '../../../redux/slices/user/userSlice';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

export function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {   
    dispatch(getUsers())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [stateForm, setStateForm] = useState({
    username: "",
    password: "",
  });

  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const login = async () => {
    try {
      await dispatch(setUserLogin(stateForm.username, stateForm.password));

      const userLogged = localStorage.getItem("userLogged") !== null 
        ? JSON.parse(localStorage.getItem("userLogged")) 
        : null;

      if (userLogged !== null) {
        setShowErrorAlert(false)
        navigate("/todo")
      } else {
        setShowErrorAlert(true)
      }
      
    } catch (error) {
      console.log("Error catch:", error);
    }
  }

  function handleChange(e) {
    setStateForm({ ...stateForm, [e.target.name]: e.target.value });
  }

  const ErrorAlert = () => {
    return (
      <>
        <Alert className="mt-2" variant={"danger"}>
          <h6>Usuario y/o contraseña incorrecto</h6>
        </Alert>
      </>
    );
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">ToDoApp - Sign In</h3>
              <div className="form-group mt-3">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control mt-1"
                  placeholder="Enter username"
                  onChange={handleChange}
                  value={stateForm.username}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  onChange={handleChange}
                  value={stateForm.password}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => login()}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
        {showErrorAlert && <ErrorAlert/> }
      </div>
    </div>
  )
}