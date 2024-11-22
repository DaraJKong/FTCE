import { createSignal, Switch, Match, Suspense } from "solid-js";
import { makeStorage } from "/src/lib/storage";

export default function Account() {
  // For now, assume that the account is a faptitans.com account (not nutaku.net or nutaku.com)
  const [account, syncAccount, { mutate }] = makeStorage(
    "account",
    { username: "", password: "" },
    { storageArea: "local", autoSync: false },
  );

  const [dirty, setDirty] = createSignal(false);
  const saveEnabled = () => dirty() && account().username.length > 0 && account().password.length > 0;

  const save = () => {
    chrome.storage.local.set({
      account: account(),
    });
    setDirty(false);
  };

  return (
    <Suspense fallback={<span class="loading loading-spinner loading-sm"></span>}>
      <Switch>
        <Match when={account.error}>
          <div class="badge badge-error">{account.error}</div>
        </Match>
        <Match when={account.state == "ready"}>
          <div class="flex flex-col">
            <label class="input input-bordered border-neutral flex items-center gap-2 mb-4">
              Username:
              <input
                type="text"
                class="w-0 grow text-primary placeholder-neutral"
                value={account().username}
                onInput={(e) => {
                  mutate({ username: e.target.value, password: account().password });
                  setDirty(true);
                }}
              />
            </label>
            <label class="input input-bordered border-neutral flex items-center gap-2">
              Password:
              <input
                type="password"
                class="w-0 grow text-primary placeholder-neutral"
                value={account().password}
                onInput={(e) => {
                  mutate({ username: account().username, password: e.target.value });
                  setDirty(true);
                }}
              />
            </label>
            <button class="btn btn-success min-w-24 self-end mt-6" on:click={save} disabled={!saveEnabled()}>
              Save
            </button>
          </div>
        </Match>
      </Switch>
    </Suspense>
  );
}
