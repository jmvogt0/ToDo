import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TodoContainer from './components/TodoContainer/TodoContainer';
import AddTask from './components/AddTask/AddTask';
import Account from './components/Account/Account';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from "./reducer/reducer";

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children: [
      {
      index: true,
      element: <TodoContainer />
      },
      {
        path:'/add',
        element: <AddTask />,
      },
      {
        path:'/account',
        element: <Account />,
      }
    ]
  }
])

const store = configureStore({reducer: rootReducer});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store ={store}>
    <RouterProvider router={router}/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
