export const requireRefreshToken = (req, res, next) => {
  let authToken = req.cookies.refreshToken;
  if (!authToken) {
    return res.status(401).json({
      message: "Refresh token is missing. Please log in to continue.",
    });
  }

  req.refreshToken = authToken;
  next();
};
