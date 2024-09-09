import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import axios from "axios";
import { AuthContext, UserStateType } from "../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = React.useContext(AuthContext) as UserStateType;
  const navigate = useNavigate();
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      await axios
        .post("/users/login", {
          email,
          password,
        })
        .then((res) => {
          setUser({
            email: res.data.email,
            name: res.data.name,
            sessionId: res.data.sessionId,
          });

          navigate("/");
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div>
      <h1>로그인</h1>
      <form>
        <div className="labelWrapper">
          <label>
            <p className="labelName">email</p>
            <input type="text" value={email} onChange={handleEmailChange} />
          </label>

          <label>
            <p className="labelName">Password</p>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <div className="buttonWrapper">
          <button type="button" onClick={handleSignup}>
            회원가입
          </button>
          <button type="button" onClick={handleLogin}>
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
