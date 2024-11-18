const waitForElm = function (selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

const waitForFunction = function (func) {
  return new Promise((resolve) => {
    if (func()) {
      return resolve(true);
    }

    const observer = new MutationObserver((mutations) => {
      if (func()) {
        observer.disconnect();
        return resolve(true);
      }
    });

    // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

const watchElement = function (
  element,
  callback,
  config = {
    subtree: false,
    childList: true,
    attributes: false,
    characterData: false,
  },
) {
  const observer = new MutationObserver(callback);

  observer.observe(element, config);

  return observer;
};

export { waitForElm, waitForFunction, watchElement };
