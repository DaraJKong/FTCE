import { injectCSS } from "/src/lib/utils";
import login from "/src/lib/scripts/accounts";

function initialize() {
  login();

  chrome.storage.sync
    .get({
      enabled: true,
      hideHeroPiecesIcon: true,
    })
    .then(
      (settings) => {
        if (settings.enabled) {
          setup(settings);
        }
      },
      (e) => {
        console.error(e);
      },
    );
}

chrome.storage.sync.onChanged.addListener((changes) => {
  const changedItems = Object.keys(changes);

  if (changedItems.length > 0) {
    cleanup();
    initialize();
  }
});

function setup(settings) {
  console.log("FTCE - Initialization");
  console.log(settings);

  if (settings.hideHeroPiecesIcon) {
    injectCSS("FTCE-Styles", ".hero-pieces-icon { display: none; }");
  }
}

function cleanup() {
  let ftceElements = document.querySelectorAll('[id^="FTCE-"]');

  for (const element of ftceElements) {
    console.log(element);
    element.remove();
  }

  console.clear();
}

initialize();
