const express = require("express");
const router = express.Router();
const { User } = require("../models/user.js");

router.post("/", async (req, res) => {
  const user = new User(req.body);
  // 유효성 검사 아이디 비밀번호에 따라 오류 설정
  // 아이디 중복 검사 실패 시
  const userId = await User.findOne({ userId: req.body.userId });
  if (userId) {
    // 400 Bad Request
    // 에러 메시지 보내기
    return res.status(400).json({
      success: false,
      message: "이미 존재하는 아이디입니다.",
    });
  }
  // 비밀번호 유효성 검사 실패 시
  if (req.body.password.length < 12) {
    // 400 Bad Request
    return res.status(400).json({
      success: false,
      message: "비밀번호는 12자 이상이어야 합니다.",
    });
  }
  await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        err,
      });
    });
});

module.exports = router;
