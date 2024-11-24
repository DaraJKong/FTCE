import { Task, Worker } from "/src/lib/scripts/tasks";
import { FapLocation } from "/src/lib/scripts/fap_titans";
import { closePopup } from "./popups";

export const openOrders = new Task(() => {
  let ordersBtn = document.querySelector("div.cw-glade-info.job");

  if (ordersBtn) {
    ordersBtn.click();
  } else {
    return "again";
  }
}, new FapLocation("#/guild/clans/main"));

export const claimRewards = new Task(() => {
  let btn = document.querySelector("div.cw-clan-order-rew-box-all div.color-btn");

  if (btn) {
    if (btn.innerText == "CLAIM REWARDS") {
      btn.click();
    }
  } else {
    return "again";
  }
}, new FapLocation("#/guild/clans/main"));

export const closeRewards = new Task(() => {
  let btn = document.querySelector("div.m-popup.fapop-reward div.color-btn");

  if (btn) {
    btn.click();
  }
}, new FapLocation("#/guild/clans/main"));

export const doOrders = new Task(() => {
  let btn = document.querySelector("div.cw-clan-order-rew-box-all div.color-btn");

  if (btn) {
    if (btn.innerText == "NEW ORDERS") {
      btn.click();
    }
  } else {
    return "again";
  }
}, new FapLocation("#/guild/clans/main"));

export const checkOrders = new Worker(() => {
  let result = Worker.DEFAULT_RESULT;

  let btn = document.querySelector("div.cw-clan-order-rew-box-all div.color-btn");

  if (btn) {
    switch (btn.innerText) {
      case "CLAIM REWARDS":
        result.tasks = [claimRewards, closeRewards];
      case "NEW ORDERS":
        result.tasks = [doOrders];
        break;
      case "WORKING":
        result.tasks = [closePopup];
        result.continue = false;
        break;
    }
  } else {
    result.tasks = [openOrders];
  }

  result.tasks = [openOrders, claimRewards, closeRewards, doOrders, closePopup];
  result.continue = false;

  return result;
});
