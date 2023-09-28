export const ValidateField = (data, errorElement, errorMessage) => {
  if (!data || data === "" || data === 0) {
    document.getElementById(errorElement).innerText = errorMessage;
    return false;
  } else {
    document.getElementById(errorElement).innerText = "";
    return true;
  }
};
