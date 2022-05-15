const IsPasswordNotEmpty = async (newValue, oldValue) => {
  if (newValue != null && newValue != "") {
    newValue = await Encrypt(newValue);
    return newValue;
  } else return oldValue;
};

const IsNotEmpty = (newValue, oldValue) => {
  if (newValue != null && newValue != "") return newValue;
  else return oldValue;
};

module.exports = {
  IsNotEmpty,
  IsPasswordNotEmpty,
};
