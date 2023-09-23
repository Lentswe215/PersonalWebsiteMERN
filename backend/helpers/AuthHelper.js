export const ValidateAuthToken = (Bearer) => {
  var validUser =
    Bearer.toLowerCase().replace("Bearer ", "") == process.env.SYSTEM_AUTHTOKEN;
  return validUser;
};
