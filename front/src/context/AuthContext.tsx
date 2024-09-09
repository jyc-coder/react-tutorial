import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export type UserStateType = {
  user:
    | {
        email: string;
        name: string;
        sessionId: string;
      }
    | undefined;
  setUser: React.Dispatch<
    React.SetStateAction<
      | {
          email: string;
          name: string;
          sessionId: string;
        }
      | undefined
    >
  >;
};

export const AuthContext = createContext<UserStateType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{
    email: string;
    name: string;
    sessionId: string;
  }>();
  useEffect(() => {
    // 기본 url 설정
    axios.defaults.baseURL = "http://localhost:3000";
  }, []);

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionid");
    console.log(sessionId);
    if (user) {
      axios.defaults.headers.common.sessionid = user.sessionId;
      localStorage.setItem("sessionid", user.sessionId);
    } else if (sessionId) {
      axios
        .get("/users/me", {
          headers: {
            sessionid: sessionId,
          },
        })
        .then((res) =>
          setUser({
            email: res.data.email,
            name: res.data.name,
            sessionId: res.data.sessionId,
          })
        )
        .catch(() => {
          localStorage.removeItem("sessionid");
          delete axios.defaults.headers.common.sessionid;
        });
    } else delete axios.defaults.headers.common.sessionid;
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
