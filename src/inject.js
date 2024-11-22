import { injectCSS } from "/src/lib/scripts/utils";
import login from "/src/lib/scripts/accounts";

function initialize() {
  login();
  setup();

  // Reduces lag spike when upgrading heroes (from shlomi#0119)
  webpackJsonp([],[(e,t,n)=>n(5).getUser().get("counters").off("add change")]);
}

chrome.storage.sync.onChanged.addListener((changes) => {
  const changedItems = Object.keys(changes);

  if (changedItems.length > 0) {
    cleanup();
    setup();
  }
});

function setup() {
  console.log("FTCE - Initialization");

  chrome.storage.sync
    .get({
      enabled: true,
      hideHeroPiecesIcon: true,
    })
    .then(
      (settings) => {
        if (settings.enabled) {
          console.log(settings);

          if (settings.hideHeroPiecesIcon) {
            injectCSS("FTCE-Styles", ".hero-pieces-icon { display: none; }");
          }
        }
      },
      (e) => {
        console.error(e);
      },
    );
}

function cleanup() {
  let ftceElements = document.querySelectorAll('[id^="FTCE-"]');

  for (const element of ftceElements) {
    element.remove();
  }

  console.clear();
}

initialize();
