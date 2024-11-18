import { createResource, createEffect, mergeProps, Switch, Match, Suspense } from "solid-js";

export default function ExtensionToggle(props) {
  const finalProps = mergeProps({ dataDefault: true }, props);

  const fetchBool = async () => {
    return chrome.storage.sync
      .get({
        [finalProps.dataName]: finalProps.dataDefault,
      })
      .then((storage) => storage[finalProps.dataName]);
  };

  const syncBool = (e) => {
    chrome.storage.sync.set({
      [finalProps.dataName]: e.currentTarget.checked,
    });
  };

  const [bool] = createResource(fetchBool);

  return (
    <Suspense fallback={<span class="loading loading-spinner loading-sm"></span>}>
      <Switch>
        <Match when={bool.error}>
          <div class="badge badge-error">{bool.error}</div>
        </Match>
        <Match when={bool.state == "ready"}>
          <label class="label cursor-pointer flex items-center">
            <span class="label-text grow">{bool() ? finalProps.textTrue : finalProps.textFalse}</span>
            <input type="checkbox" class="toggle" checked={bool()} on:change={syncBool} />
          </label>
        </Match>
      </Switch>
    </Suspense>
  );
}
