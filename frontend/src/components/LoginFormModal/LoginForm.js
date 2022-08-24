// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css"

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.message) setErrors([data.message]);
      }
    );
  };

  return (
      <form onSubmit={handleSubmit} className='loginForm'>
      <div>
        {errors.map((error, idx) => (
          <div key={idx} className='divErrors'>{error}</div>
        ))}
      </div>
      <h1 className='loginTitle'>Welcome to AwayBnB</h1>
      <label>
        <input
          type="text"
          placeholder="Username"
          className="userInput"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          type="password"
          placeholder="Password"
          className="passwordInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <div>
      <button
      type="submit"
      className="submitLogin"
      >Continue</button>
      </div>
      <div>
      <button
      onClick={() => {
        setCredential('Demo-lition');
        setPassword("password")
    }}
      type="submit"
      className="submitDemo"
      >Demo Login</button>
      </div>
    </form>
  );
}

export default LoginForm;
