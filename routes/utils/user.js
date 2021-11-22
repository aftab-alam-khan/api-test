
const bcrypt = require('bcryptjs');

const hashUserPassowrd = async (email, password, roundSalts) => {
  //Hash passwords
  const salt = await bcrypt.genSalt(roundSalts);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    email: email,
    password: hashedPassword
  };

  return user;
};


module.exports = { hashUserPassowrd };