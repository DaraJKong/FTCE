class Task {
  constructor(name, context, action) {
    this.name = name;
    this.context = context;
    this.action = action;
  }

  checkContext() {}

  run() {
    this.action();
  }
}
