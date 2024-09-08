import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import axios from "axios";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    try {
      axios
        .post(
          "http://localhost:3000/login",
          {
            username,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          alert(`로그인 성공했습니다.`);
          navigate("/");
        });
    } catch {
      alert("로그인 실패했습니다.");
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
            <p className="labelName">UserName:</p>
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>

          <label>
            <p className="labelName">Password:</p>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </div>
        <div className="buttonWrapper">
          <button type="button" onClick={handleLogin}>
            로그인
          </button>
          <button type="button" onClick={handleSignup}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
