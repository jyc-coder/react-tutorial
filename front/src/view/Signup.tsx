import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import axios from "axios";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3000/signup", {
          email,
          password,
        })
        .then(() => {
          alert("회원가입 성공했습니다.");
          navigate("/");
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
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
          <button onClick={() => navigate("/")}>취소</button>
          <button type="submit">가입하기</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
