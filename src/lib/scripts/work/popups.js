import { Task, Worker } from "/src/lib/scripts/tasks";

export const closePopup = new Task(() => {
  let exitBtn =
    document.querySelector("#popupContainer div.butn.exit") ||
    document.querySelector("#popupContainer div.btn-close-x") ||
    document.querySelector("#popupContainer div.color-btn.close") ||
    document.querySelector("#popupContainer div.btn-simple-silver.btn-cancel") ||
    document.querySelector("#popupContainer div.color-btn.collect") ||
    document.querySelector("#popupContainer div.btn-simple-green.btn-ok") ||
    document.querySelector("#popupContainer div.color-btn.ok");

  if (exitBtn) {
    exitBtn.click();
  }
});

export const checkPopup = new Worker(() => {
  let result = Worker.DEFAULT_RESULT;

  let popup = document.querySelector("#popupContainer");

  if (popup) {
    result.tasks = [closePopup];
  } else {
    result.continue = false;
  }

  return result;
});
