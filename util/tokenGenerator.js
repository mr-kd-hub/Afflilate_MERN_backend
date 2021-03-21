const jwt = require('jsonwebtoken');

module.exports.tokenGenerator = (id) => {
  try {
    const token = jwt.sign({ id }, 'TOKEN_SECRET', { expiresIn: '24h' });
    return token;
  } catch (err) {
    console.log(err);
  }
};
