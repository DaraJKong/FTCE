import { createSignal, Switch, Match, Suspense } from "solid-js";
import { makeStorage } from "/src/lib/storage";

export default function Account() {
  // For now, assume that the account is a faptitans.com account (not nutaku.net or nutaku.com)
  const [account, syncAccount, { mutate }] = makeStorage(
    "account",
    { username: null, password: null },
    { storageArea: "local", autoSync: false },
  );

  const [saveEnabled, setSaveEnabled] = createSignal(false);

  const save = () => {
    chrome.storage.local.set({
      account: account(),
    });
    setSaveEnabled(false);
  };

  return (
    <Suspense fallback={<span class="loading loading-spinner loading-sm"></span>}>
      <Switch>
        <Match when={account.error}>
          <div class="badge badge-error">{account.error}</div>
        </Match>
        <Match when={account.state == "ready"}>
          <label class="input input-bordered border-neutral flex items-center gap-2">
            Username:
            <input
              type="text"
              class="w-0 grow text-primary placeholder-neutral"
              value={account().username}
              onInput={(e) => {
                mutate({ username: e.target.value, password: account().password });
                setSaveEnabled(true);
              }}
            />
          </label>
          <label class="input input-bordered border-neutral flex items-center gap-2">
            Password:
            <input
              type="password"
              class="w-0 grow text-primary placeholder-neutral"
              value={account().username}
              onInput={(e) => {
                mutate({ username: account().username, password: e.target.value });
                setSaveEnabled(true);
              }}
            />
          </label>
          <button class="btn btn-success" on:click={save} disabled={!saveEnabled()}>
            Save
          </button>
        </Match>
      </Switch>
    </Suspense>
  );
}
