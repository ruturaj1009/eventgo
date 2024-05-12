const bcrypt = require("bcrypt");

const passhash = async (opass) => {
  try {
    const saltRounds = 10;
    const hashedpass = await bcrypt.hash(opass, saltRounds);
    return hashedpass;
  } catch (error) {
    console.log(error);
  }
};

const matchpass = async (opass, npass) => {
  try {
    const res = bcrypt.compare(opass, npass);
    return res;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  passhash,
  matchpass,
};
