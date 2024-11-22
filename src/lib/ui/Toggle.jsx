import { mergeProps, Switch, Match, Suspense } from "solid-js";
import { makeStorage } from "/src/lib/scripts/storage";

export default function Toggle(props) {
  props = mergeProps({ default: true, textTrue: "Activated", textFalse: "Deactivated" }, props);

  const [bool, syncBool] = makeStorage(props.name, props.default);

  return (
    <Suspense fallback={<span class="loading loading-spinner loading-sm"></span>}>
      <Switch>
        <Match when={bool.error}>
          <div class="badge badge-error">{bool.error}</div>
        </Match>
        <Match when={bool.state == "ready"}>
          <label class="label cursor-pointer flex items-center">
            <span class="label-text grow text-base">{bool() ? props.textTrue : props.textFalse}</span>
            <input
              type="checkbox"
              class="toggle"
              checked={bool()}
              on:change={(e) => syncBool(e.currentTarget.checked)}
            />
          </label>
        </Match>
      </Switch>
    </Suspense>
  );
}
