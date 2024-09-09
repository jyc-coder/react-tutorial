import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import axios from "axios";
import { AuthContext, UserStateType } from "../context/AuthContext";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = React.useContext(AuthContext) as UserStateType;
  const navigate = useNavigate();

  // onChange 메소드
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios
        .post("/users/signup", {
          email,
          name,
          password,
        })
        .then((res) => {
          setUser({
            email: res.data.email,
            name: res.data.name,
            sessionId: res.data.sessionId,
          });
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
            <p className="labelName">name</p>
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
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
          <button onClick={() => navigate("/")}>취소</button>
          <button type="submit">가입하기</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
