import { FapLocation } from "/src/lib/scripts/fap_titans";
import { rndIntInclusive } from "/src/lib/scripts/utils";

export class Task {
  constructor(action, context = new FapLocation(), delay = [250, 750]) {
    this.action = action;
    this.context = context;
    this.delay = delay;
  }

  static get TASKS() {
    return {
      closePopup: new Task(closePopup),
    };
  }

  static new(name) {
    return this.TASKS[name];
  }

  static pause(delay) {
    return new Task(Function.prototype, new FapLocation(), delay);
  }

  schedule() {
    return Date.now() + rndIntInclusive(this.delay[0], this.delay[1]);
  }

  checkContext() {
    return FapLocation.check(this.context);
  }

  goToContext() {
    return FapLocation.goToByStep(this.context);
  }

  run() {
    if (this.goToContext()) {
      return this.action();
    } else {
      return "again";
    }
  }

  checkAndRun() {
    if (this.checkContext()) {
      return this.action();
    }
  }
}

export class Worker {
  constructor(watcher, delay = [1000, 5000]) {
    this.watcher = watcher;
    this.delay = delay;
  }

  static get DEFAULT_RESULT() {
    return {
      continue: true,
      tasks: [],
    };
  }

  static get WORKERS() {
    return {
      checkPopup: new Worker(checkPopup),
    };
  }

  static new(name) {
    return this.WORKERS[name];
  }

  run() {
    return this.watcher();
  }
}

export class TaskQueue {
  constructor(workers, tasks = [], delay = [1000, 5000], update = 10) {
    this.workers = workers;
    this.tasks = tasks;
    this.delay = delay;
    this.update = update;

    this.interval_id = null;
    this.due_time = 0;
  }

  addWorker(worker) {
    this.workers.push(worker);
  }

  processWorker() {
    if (this.workers.length > 0) {
      let worker = this.workers.shift();
      let result = worker.run();

      this.tasks.push(...result.tasks);

      if (result.continue) {
        this.workers.unshift(worker);
      } else {
        this.tasks.push(Task.pause(this.delay));
      }
    }
  }

  addTask(task) {
    this.tasks.push(task);
  }

  processTask() {
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

    if (this.tasks.length == 0) {
      this.processWorker();
    }

    if (this.tasks.length > 0) {
      this.due_time = this.tasks[0].schedule();
    }
  }

  start() {
    this.interval_id = setInterval(() => {
      if (Date.now() >= this.due_time) {
        this.processTask();
      }
    }, this.update);
  }

  stop() {
    clearInterval(this.interval_id);
  }
}

function checkPopup() {
  let result = Worker.DEFAULT_RESULT;

  let popup = document.querySelector("#popupContainer");

  if (popup) {
    result.tasks = [Task.new("closePopup")];
  } else {
    result.continue = false;
  }

  return result;
}

function closePopup() {
  let exitBtn =
    document.querySelector("#popupContainer div.btn-close-x") ||
    document.querySelector("#popupContainer div.butn.exit");

  if (exitBtn) {
    exitBtn.click();
  }
}
