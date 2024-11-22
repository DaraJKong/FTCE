const schedule = [
  [10, 14], // sunday
  [10, 15], // monday
  [10, 14], // tuesday
  [10, 14], // wednesday
  [10, 14], // thursday
  [11, 18], // friday
  [10, 15], // saturday
];

const pomodoro = {
  period: 3600 * 1000,
  break: 900 * 1000,
};

const delay = {
  time: 500,
  randomize: 200,
  concentration: {
    update: [15 * 1000, 300 * 1000],
    effect: [-250, 250],
  },
};

const init_time_keeper = function () {
  return setInterval(() => {
    let now = Date.now();

    let today_hours = schedule[now.getDay()];
    let current_hour = now.getHours();

    if (current_hour >= today_hours[0] && current_hour < today_hours[1]) {
    }
  }, 60 * 1000);
};
