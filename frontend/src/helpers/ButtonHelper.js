export const disableButton = (btnElement, loadingMessage) => {
  if (btnElement) {
    btnElement.disabled = true;
    btnElement.innerHTML = `<div class="spinner-border spinner-border-sm text-light" role="status"></div> ${loadingMessage}`;
  }
};

export const enableButton = (btnId, btnText) => {
  const btnElement = document.getElementById(btnId);
  console.log("ELement:", btnId, btnText, btnElement);
  btnElement.disabled = false;
  btnElement.innerHTML = btnText;
};
