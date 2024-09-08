import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>메인 페이지</h1>
      {/* 로그인 페이지로 이동 버튼 */}
      <button onClick={() => navigate("/login")}>로그인</button>
      {/* 회원가입 페이지로 이동 버튼 */}
      <button onClick={() => navigate("/signup")}>회원가입</button>
    </div>
  );
};

export default Home;
