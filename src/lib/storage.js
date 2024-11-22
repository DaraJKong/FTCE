import { createResource, onCleanup } from "solid-js";

const makeStorage = function (name, initialValue, options = {}) {
  const defaultMapFn = Array.isArray(initialValue) ? (x) => Object.values(x[name]) : (x) => x[name];
  options = Object.assign({ storageArea: "sync", autoSync: true, mapFn: defaultMapFn }, options);

  const fetch = async () => {
    return chrome.storage[options.storageArea]
      .get({
        [name]: initialValue,
      })
      .then(options.mapFn);
  };

  const [storage, { mutate, refetch }] = createResource(fetch);

  const syncStorage = (data) => {
    mutate(data);

    chrome.storage[options.storageArea].set({
      [name]: data,
    });
  };

  if (options.autoSync) {
    const handleStorageChange = (changes) => {
      if (changes[name]) {
        if (changes[name].newValue != storage.latest) {
          mutate(changes[name].newValue);
        }
      }
    };

    chrome.storage[options.storageArea].onChanged.addListener(handleStorageChange);

    onCleanup(() => {
      chrome.storage[options.storageArea].onChanged.removeListener(handleStorageChange);
    });
  }

  return [storage, syncStorage, { mutate, refetch }];
};

export { makeStorage };
