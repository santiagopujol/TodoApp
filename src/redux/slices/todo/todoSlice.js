import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    list: []
  },
  reducers: {
    setTodoList: (state, action) => {
      state.list = action.payload;
    },
    addTodo: (state, action) => {
      state.list.push(action.payload)
    },
    updateTodo: (state, action) => {
      const {id, title, completed} = action.payload
      const foundTodo = state.list.find(todo => todo.id === id)
      if (foundTodo) {
        foundTodo.title = title
        foundTodo.completed = completed
      }
    },
    deleteTodo: (state, action) => {
      const todoFound = state.list.find(todo => todo.id === action.payload)
      if (todoFound) {
        state.list.splice(state.list.indexOf(todoFound), 1)
      }
    },
  },
})

export const { setTodoList, addTodo, updateTodo, deleteTodo} = todoSlice.actions

export const getTodos = () => async (dispatch) => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos`
    );
    const todoListData = await res.json();
    dispatch(setTodoList(todoListData))
  } catch (error) {
    console.log(error)
  }
}
      
export default todoSlice.reducer
