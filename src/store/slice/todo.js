import { createSlice } from "@reduxjs/toolkit";

const initState = {
  todos: JSON.parse(localStorage.getItem('todo')) || [],
}

export const todoSlice = createSlice({
  name: "todo",
  initialState: initState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload)
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload)
      todo.done = !todo.done
    },
  },
})


export const { todo } = todoSlice.actions;

export const todoReducer = todoSlice.reducer;