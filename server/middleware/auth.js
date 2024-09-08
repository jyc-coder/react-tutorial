const User = require("../models/user");

// 인증 처리
const auth = async (req, res, next) => {
  try {
    // 클라이언트 쿠키에서 토큰 가져오기
    const token = req.cookies.x_auth;
    // 토큰 복호화 후 유저 찾기
    const user = await User.findByToken(token);
    if (!user) {
      return res.json({
        isAuth: false,
        error: true,
        message: "유저를 찾을 수 없습니다.",
      });
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    throw err;
  }
};

module.exports = { auth };
