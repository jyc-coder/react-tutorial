const express = require("express");
const router = express.Router();
const { User } = require("../models/user.js");

router.post("/", async (req, res) => {
  try {
    // 이메일 조회
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404);
      return res.json({
        loginSuccess: false,
        message: "입력하신 이메일과 일치하는 이메일이 없습니다.",
      });
    }
    // 비밀번호 일치 여부 확인
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      res.status(404);
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
    // 토큰 생성후 완료 메시지 전송
    const token = await user.generateToken();

    res.cookie("x_auth", token).status(200).json({
      loginSuccess: true,
      userId: user._id,
      message: "로그인에 성공하였습니다.",
    });
  } catch (err) {
    res.json({
      loginSuccess: false,
      err,
    });
  }
});

module.exports = router;
