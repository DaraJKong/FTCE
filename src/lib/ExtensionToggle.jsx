import { createResource, createEffect, Switch, Match, Suspense } from "solid-js";

const fetchEnabled = async () => {
  return chrome.storage.sync
    .get({
      enabled: true,
    })
    .then((storage) => storage.enabled);
};

const syncEnabled = (e) => {
  chrome.storage.sync.set({
    enabled: e.currentTarget.checked,
  });
};

export default function ExtensionToggle() {
  const [enabled] = createResource(fetchEnabled);

  return (
    <>
      <Suspense fallback={<span class="loading loading-spinner loading-sm"></span>}>
        <Switch>
          <Match when={enabled.error}>
            <div class="badge badge-error">{enabled.error}</div>
          </Match>
          <Match when={enabled.state == "ready"}>
            <label class="label cursor-pointer flex items-center">
              <span class="label-text grow">Extension {enabled() ? "activated" : "deactivated"}</span>
              <input type="checkbox" class="toggle" checked={enabled()} on:change={syncEnabled} />
            </label>
          </Match>
        </Switch>
      </Suspense>
    </>
  );
}
