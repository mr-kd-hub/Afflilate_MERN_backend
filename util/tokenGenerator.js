const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
module.exports.tokenGenerator = (id) => {
  try {
    const token = jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '24h' });
    return token;
  } catch (err) {
    console.log(err);
  }
};
