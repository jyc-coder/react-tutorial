const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 20,
  },
  email: {
    type: String,
    // 띄어쓰기 제거
    trim: true,
    // 중복 허용 X
    unique: 1,
  },
  password: {
    type: String,
    minlength: 12,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// 비밀번호 비교 메소드
userSchema.methods.comparePassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

// save 전에 비밀번호 암호화
userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// 토큰 생성 메소드
userSchema.methods.generateToken = function () {
  const user = this;
  // jsonwebtoken을 통해 token 생성
  const token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;

  return user.save().then(() => token);
};

// 토큰 복호화 메소드
userSchema.statics.findByToken = function (token) {
  const user = this;
  return new Promise((resolve, reject) => {
    jwt.verify(token, "secretToken", (err, decoded) => {
      if (err) {
        reject(err);
      }

      user
        .findOne({ _id: decoded, token: token })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
