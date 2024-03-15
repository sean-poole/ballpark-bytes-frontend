import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const emailRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  
  const { setAuth } = useAuth();

  useEffect(() => {
    // Default focus to email input.
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    // Reset error message when email / password inputs change.
    setErrMsg("");
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendURL}/login`, {
        email,
        password
      });

      // Authorize user.
      setAuth(response.data);
      // Clear input fields.
      setEmail("");
      setPassword("");
      // Navigate to sections route.
      navigate("/sections");
    } catch(err) {
      console.error(err.message);
      setErrMsg("Login failed. Please check your credentials and try again.");
    }
  }

  return (
    <div className="main--container flex flex-col justify-center items-center">
      <div className="grey-bg flex flex-col items-center justify-center p-4 rounded">
        { /* DISPLAY ANY ERROR MESSAGES */ }
        { errMsg && <p className="errmsg" ref={errRef} aria-live="assertive">{errMsg}</p> }
        { /* LOGIN FORM */ }
        <form className="text-xl" onSubmit={handleLogin}>
          { /* USERNAME INPUT FIELD */}
          <div className="form-group">
            <div className="form-label">
              <label htmlFor="email">Email </label>
            </div>
            <div className="form-control">
              <input
                type="text"
                className="black-border mb-4 p-2 rounded"
                id="email"
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
          </div>
          { /* PASSWORD INPUT FIELD */}
          <div className="form-group">
            <div className="form-label">
              <label htmlFor="password">Password </label>
            </div>
            <div className="form-control">
              <input
                type="password"
                className="black-border mb-4 p-2 rounded"
                id="password"
                maxLength={10}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>
          </div>
          <button 
            type="submit" 
            className="login-btn black-border mt-3 p-2 w-full font-bold text-xl tracking-widest rounded"
          >
            LOGIN
          </button>
        </form>
      </div>
      <div className="white-bg flex flex-col items-center mt-5 p-2 rounded">
        <h5>Visitor Login Credentials</h5>
        <p>tester@tester.com | tester123</p>
      </div>
    </div>
  );
}
