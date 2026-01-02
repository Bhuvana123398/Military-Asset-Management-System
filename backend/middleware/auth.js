const jwt = require('jsonwebtoken');
const authorize = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'military_secret_key_123');
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: Access Denied" });
      }
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  };
};
module.exports = authorize;