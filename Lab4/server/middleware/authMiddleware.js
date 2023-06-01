const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    let token = req.headers.authorization.split(' ')[1] // Bearer token
    console.log(token)
    if (!token) {
      return res.status(401).json({message: "Not authorized"});
    }
    let decoded = jwt.verify(token, 'secretBebra');
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({message: "Not authorized"})
  }
};