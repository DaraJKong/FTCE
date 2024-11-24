const schedule = [
  [10, 14], // sunday
  [10, 15], // monday
  [10, 14], // tuesday
  [10, 14], // wednesday
  [10, 14], // thursday
  [11, 18], // friday
  [10, 15], // saturday
];

// For development purposes
const dev_mode = true;

const pomodoro = {
  period: 3600 * 1000,
  break: 900 * 1000,
};

function punch_in() {
  if (chrome.extension.inIncognitoContext) {
    chrome.storage.sync.get("enabled").then((settings) => {
      if (settings.enabled) {
        chrome.tabs.query({ url: "https://faptitans.com/*" }, (tabs) => {
          if (tabs.length == 0) {
            console.log("Punch in");

            chrome.tabs.create({ url: "https://faptitans.com/login/", active: true });
          }
        });
      }
    });
  }
}

function punch_out() {
  chrome.tabs.query({ url: "https://faptitans.com/*" }, (tabs) => {
    console.log("Punch out");

    let tabIds = tabs.map((tab) => tab.id);
    chrome.tabs.remove(tabIds);
  });
}

export default function init_time_keeper() {
  return setInterval(
    () => {
      const today = new Date(Date.now());

      let today_hours = schedule[today.getDay()];
      let current_hour = today.getHours();

      if ((current_hour >= today_hours[0] && current_hour < today_hours[1]) || dev_mode) {
        punch_in();
      } else {
        punch_out();
      }
    },
    dev_mode ? 2000 : 25 * 1000,
  );
}
