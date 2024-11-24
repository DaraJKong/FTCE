import { Task, Worker } from "/src/lib/scripts/tasks";

export const closePopup = new Task(() => {
  let exitBtn =
    document.querySelector("#popupContainer div.btn-close-x") ||
    document.querySelector("#popupContainer div.butn.exit");

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
