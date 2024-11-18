import Routes from "./routes";

const Router = {
  sendReady: function (currentUrl, requestUrl, tabId) {
    const parsedCurrentUrl = new URL(currentUrl);
    const parsedRequestUrl = new URL(requestUrl);

    console.log(parsedRequestUrl);

    if (currentUrl && tabId) {
      for (const [key, value] of Object.entries(Routes)) {
        if (
          parsedCurrentUrl.pathname.search(value.match) > -1 &&
          parsedRequestUrl.pathname.search(value.readyMatch) > -1
        ) {
          chrome.tabs.sendMessage(tabId, { type: value.page });
        }
      }
    }
  },
  listenMessages: async function () {
    const readyStateCheckInterval = setInterval(function () {
      if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);

        chrome.runtime.onMessage.addListener(function (request, _sender, _sendResponse) {
          let promise = chrome.storage.sync.get({
            enabled: true,
          });

          promise.then(
            (items) => {
              if (items.enabled && request) {
                for (const [key, value] of Object.entries(Routes)) {
                  if (request.type == value.page) {
                    value.script();
                  }
                }
              }
            },
            (e) => {
              console.error(e);
            },
          );
        });
      }
    }, 10);
  },
};

export default Router;
