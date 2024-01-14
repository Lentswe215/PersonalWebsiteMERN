const ValidateAuthToken = (Bearer) => {
  var validUser =
    process.env.SYSTEM_AUTHTOKEN.toLowerCase().trim();

  return validUser;
};

module.exports = { ValidateAuthToken };
