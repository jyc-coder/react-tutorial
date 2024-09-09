import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, UserStateType } from "../context/AuthContext";
import axios from "axios";
const Home: React.FC = () => {
  const { user, setUser } = React.useContext(AuthContext) as UserStateType;
  const navigate = useNavigate();
  React.useEffect(() => {
    console.log(user);
  }, []);
  const logout = async () => {
    try {
      await axios.patch("/users/logout");
      // user 초기화
      setUser(undefined);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>메인 페이지</h1>
      {user ? (
        <>
          <h2>환영합니다. {user.name}님!</h2>
          <button onClick={logout}>로그아웃</button>
        </>
      ) : (
        <>
          {/* 로그인 페이지로 이동 버튼 */}
          <button onClick={() => navigate("/login")}>로그인</button>
          {/* 회원가입 페이지로 이동 버튼 */}
          <button onClick={() => navigate("/signup")}>회원가입</button>
        </>
      )}
    </div>
  );
};

export default Home;
