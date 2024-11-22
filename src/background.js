let tabId;
let currentUrl;

chrome.webRequest.onCompleted.addListener(
  function (details) {
    if (!tabId) {
      update(details);
    }
  },
  {
    urls: ["https://faptitans.com/*"],
  },
);

chrome.webNavigation.onHistoryStateUpdated.addListener(update, {
  url: [
    {
      hostSuffix: "faptitans.com",
    },
  ],
});

function update(details) {
  tabId = details.tabId;
  currentUrl = details.url;

  console.log("------ UPDATE ------");
  console.log("tabId: " + tabId);
  console.log(currentUrl);
  console.log("--------------------");
}
