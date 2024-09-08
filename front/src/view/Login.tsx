import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        .post("http://localhost:3000/login", {
          email,
          password,
        })
        .then(() => {
          alert(`로그인 성공했습니다.`);
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
            <p className="labelName">UserName:</p>
            <input type="text" value={email} onChange={handleEmailChange} />
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
