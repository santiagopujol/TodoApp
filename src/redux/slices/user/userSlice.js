import { createSlice } from '@reduxjs/toolkit'

  // Mock data user
  const USERDATA = [{
    idUser: 1,
    email: "test@gmail.com",
    username: "usertest",
    password: "test"
  }];

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userLogged: null,
    list: []
  },
  reducers: {
    setUserList: (state, action) => {
      state.list = action.payload;
    },
    setUserLogged: (state, action) => {
      state.userLogged = action.payload;
    },
  },
})

export const { setUserList, setUserLogged } = userSlice.actions

export const selectUserList = (state) => state.user.list;

export const getUsers = () => (dispatch) => {
  dispatch(setUserList(USERDATA));
}
      
export const setUserLogin = (username, password) => (dispatch, getState) => {
  const userListState = selectUserList(getState());
  const userFilter = userListState.find((item => username === item.username && password === item.password)) || null;
  localStorage.setItem("userLogged", JSON.stringify(userFilter));
  dispatch(setUserLogged(userFilter));
}

export const setUserLogout = () => (dispatch) => {
  localStorage.setItem("userLogged", null);
  dispatch(setUserLogged(null));
}

export default userSlice.reducer

