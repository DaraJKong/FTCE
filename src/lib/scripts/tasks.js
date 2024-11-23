import { FapLocation } from "/src/lib/scripts/fap_titans";
import { rndIntInclusive } from "/src/lib/scripts/utils";

const TASKS = {
  closePopup,
};

export class Task {
  constructor(name, context = new FapLocation(), action = null) {
    this.name = name;
    this.context = context;

    if (name == "custom") {
      this.action = () => action();
    } else {
      this.action = () => TASKS[name];
    }
  }

  checkContext() {
    return FapLocation.current == this.context;
  }

  goToContext() {
    FapLocation.goTo(this.context);
  }

  run() {
    this.goToContext();
    return this.action()();
  }

  checkAndRun() {
    if (this.checkContext()) {
      return this.action()();
    }
  }
}

export class TaskQueue {
  constructor(tasks = [], delay = [1000, 5000], update = 10) {
    this.tasks = tasks;
    this.delay = delay;
    this.update = update;

    this.interval_id = null;
    this.due_time = 0;
  }

  add(task) {
    this.tasks.push(task);
  }

  processNext() {
    if (this.tasks.length > 0) {
      let task = this.tasks.shift();
      let result = task.run();

      switch (result) {
        case "again":
          this.tasks.unshift(task);
          break;
        case "duplicate":
          this.tasks.push(task);
          break;
      }
    }

    this.due_time = Date.now() + rndIntInclusive(this.delay[0], this.delay[1]);
  }

  start() {
    this.interval_id = setInterval(() => {
      if (Date.now() >= this.due_time) {
        this.processNext();
      }
    }, this.update);
  }

  stop() {
    clearInterval(this.interval_id);
  }
}

function closePopup() {
  let exitBtn =
    document.querySelector("#popupContainer div.btn-close-x") ||
    document.querySelector("#popupContainer div.butn.exit");

  if (exitBtn) {
    exitBtn.click();
  }
}
