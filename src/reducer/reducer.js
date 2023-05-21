import { createAction, createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../axiosUrl";

export const updateTasks = createAction("todo/updateTasks");
export const loadTasks = createAsyncThunk("todo/loadTasks", async () => {
  const res = await axios.get("/tasks")
  return res.data;
});

const initialState = {
  tasks: [],
}

const todoReducer = createReducer(initialState, (builder) => {
  console.log("hallo");
  builder.addCase(loadTasks.fulfilled, (state, action) => {
    return {
      ...state,
      tasks: action.payload,
    }
  })
  .addCase(updateTasks, (state, action) => {
    const taskIndex = state.tasks.findIndex(v => v._id === action.payload._id)
    const taskCopy = {...state.tasks[taskIndex]}
    taskCopy.completed = action.payload.completed;
    console.log(...state.tasks);
    const taskArrayCopy = [...state.tasks];
    taskArrayCopy[taskIndex] = taskCopy;

    return {
      ...state,
      tasks: taskArrayCopy,
    }
  })
});

export default todoReducer;