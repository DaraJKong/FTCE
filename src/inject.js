import { injectCSS } from "/src/lib/scripts/utils";
import { Task, Worker, TaskQueue } from "/src/lib/scripts/tasks";
import { checkPopup, login } from "/src/lib/scripts/work/prelude";
import { checkOrders } from "./lib/scripts/work/clans";

let task_queue;

function initialize() {
  setup();

  // Reduces lag spike when upgrading heroes (from shlomi#0119)
  // webpackJsonp([], [(e, t, n) => n(5).getUser().get("counters").off("add change")]);
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

          task_queue = new TaskQueue([checkPopup, checkOrders], [login]);
          task_queue.start();
        } else {
          console.log("FTCE is currently disabled in the options.");
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

  if (task_queue) {
    task_queue.stop();
  }

  console.clear();
}

initialize();
