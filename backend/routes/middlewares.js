const jwt = require("jsonwebtoken");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ error: true, code: 401, data: "로그인 필요" });
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) next();
  else {
    const message = encodeURIComponent("현재 로그인 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      // 유효시간 초과
      return res.status(419).json({
        error: true,
        code: 419,
        data: "토큰이 만료되었습니다.",
      });
    }

    return res.status(401).json({
      error: true,
      code: 401,
      data: "유효하지 않은 토큰입니다.",
    });
  }
};
