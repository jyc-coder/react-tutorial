const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const mongoose = require("mongoose");

// 로그인
router.post("/login", async (req, res) => {
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
  user.sessions.push({ createdAt: new Date() });
  const session = user.sessions[user.sessions.length - 1];
  try {
    await user.save();
    res.status(200).json({
      message: "로그인에 성공하였습니다.",
      sessionId: session._id,
      name: user.name,
      email: user.email,
    });
    // 토큰 생성후 완료 메시지 전송
    // const token = await user.generateToken();

    // res.cookie("x_auth", token).status(200).json({
    //   loginSuccess: true,
    //   userId: user._id,
    //   message: "로그인에 성공하였습니다.",
    // });
  } catch (err) {
    res.status(400).json({
      success: false,
      err,
    });
  }
});

// 로그아웃
router.patch("/logout", async (req, res) => {
  console.log(req.headers.sessionid);
  try {
    const { sessionid } = req.headers;
    if (!mongoose.isValidObjectId)
      throw new Error("세션 아이디가 유효하지 않습니다.");
    const user = await User.findOne({
      "sessions._id": sessionid,
    });
    if (!user) throw new Error("세션을 찾을 수 없습니다.");
    // 해당 사용자의 세션id 제거
    await User.updateOne(
      { _id: user.id },
      {
        $pull: {
          sessions: {
            _id: sessionid,
          },
        },
      }
    );
    res.json({
      message: "로그아웃에 성공하였습니다.",
    });
  } catch (err) {
    res.status(400).json({
      loginSuccess: false,
      err,
    });
  }
});

// 회원가입
router.post("/signup", async (req, res) => {
  const user = new User(req.body);
  // 유효성 검사 아이디 비밀번호에 따라 오류 설정
  // 아이디 중복 검사 실패 시
  const email = await User.findOne({ email: req.body.email });

  if (email) {
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
  // user 에 sessions 추가
  user.sessions.push({ createdAt: new Date() });
  try {
    await user.save();
    const session = user.sessions[0];
    res.status(200).json({
      message: "회원가입에 성공하였습니다.",
      sessionId: session._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      err,
    });
  }
});

// 회원정보 조회
router.get("/me", (req, res) => {
  try {
    if (!req.user) throw new Error("권한이 없습니다.");
    res.status(200).json({
      message: "회원 정보 조회 완료",
      sessionId: req.headers.sessionid,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      err,
    });
  }
});

module.exports = router;
