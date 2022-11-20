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
