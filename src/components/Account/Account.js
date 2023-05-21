import { useState } from "react";
import axios from '../../axiosUrl';
import './Account.css';

const Account = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const onLogin = () => {
    axios.post("/login", {email,password})
    .then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    });
  }

  const onSignup = () => {
    axios.post("/signup", {email,password})
    .then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    });
  }

  return (
    <div className="Account">
      <div className="Account__Login">
        <h1>
          Login
        </h1>
        <div>
          <label>email</label>
          <input type="text" value={email}
            onChange={onEmailChange} />
        </div>
        <div>
        <label>password</label>
          <input type="password" value={password}
            onChange={onPasswordChange} />
        </div>
      </div>
      <div>
        <button onClick={onLogin}>Login</button>
        <button onClick={onSignup}>Registrieren</button>
      </div>
    </div>
  )
}

export default Account;