const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const notAuthorized = () => {
    req.isAuth = false;
    return next();
  };
  const authHeader = req.get("Authorization");
  if (!authHeader) return notAuthorized();
  
  const token = authHeader.split(" ")[1];
  if (!token) return notAuthorized();
  
  let decoded;
  try {
    decoded = jwt.verify(token, "itachi-uchiha");
  } catch (err) {
    return notAuthorized();
  }
  if (!decoded) {
    return notAuthorized();
  }
  req.isAuth = true;
  req.userID = decoded.userID;
  return next();
};

module.exports = auth;
