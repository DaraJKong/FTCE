import { Task } from "/src/lib/scripts/tasks";

export const login = new Task(() => {
  if (window.location.pathname.startsWith("/login")) {
    chrome.storage.local.get("account").then((storage) => {
      if (storage.account) {
        document.querySelector("input[name=username]").value = storage.account.username;
        document.querySelector("input[name=password]").value = storage.account.password;
        document.querySelector("button.btn-ok").click();
      }
    });
  }
});
