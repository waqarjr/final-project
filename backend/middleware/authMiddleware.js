const jwt = require('jsonwebtoken');

/**
 * verifyAdmin middleware
 * Verifies the JWT stored in the httpOnly cookie 'adminToken'.
 * Only allows access if the token is valid and the role is 'admin'.
 */
const verifyAdmin = (req, res, next) => {
  const token = req.cookies?.adminToken;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorised: No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: Admins only.' });
    }
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorised: Invalid or expired token.' });
  }
};

/**
 * verifyUser middleware
 * Verifies the JWT stored in the httpOnly cookie 'userToken'.
 * Attaches the decoded payload to req.user so controllers can
 * read req.user.email instead of trusting req.body.email (IDOR fix).
 */
const verifyUser = (req, res, next) => {
  const token = req.cookies?.userToken;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorised: Please sign in.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorised: Invalid or expired token.' });
  }
};

module.exports = { verifyAdmin, verifyUser };
