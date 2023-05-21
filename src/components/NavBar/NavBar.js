import React from "react";
import './NavBar.css';
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <div className="NavBar">
      <div className="NavBar__Title">ToDo App</div>
      <div className="NavBar__Buttons">
        <Link to={'/'} className="NavBar__Button">ToDo's</Link>
        <Link to={'/add'} className="NavBar__Button">Add Task</Link>
        <Link to={'/account'} className="NavBar__Button">Account</Link>
      </div>  
    </div>
  )
}

export default NavBar;