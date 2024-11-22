import packageJson from "/package.json";
import ftceLogo from "/logo.svg";
import ExtensionToggle from "/src/lib/ExtensionToggle";
import Account from "/src/lib/Account";
import HeroPiecesIconToggle from "/src/lib/HeroPiecesIconToggle";

const { description } = packageJson;

export default function App() {
  return (
    <main>
      <div class="w-[900px] mx-auto">
        <div class="w-full flex items-center px-6 py-3 border-b border-neutral bg-base-100 bg-[url('/public/images/ftce_cover.jpg')] bg-cover bg-center bg-blend-multiply">
          <img src={ftceLogo} alt="logo" class="size-12 mr-4" />
          <h1 class="grow text-lg font-medium text-primary">{description}</h1>
        </div>
        <div class="w-[800px] mx-auto">
          <div role="tablist" class="tabs tabs-bordered">
            <input type="radio" name="options_tabs" role="tab" class="tab text-nowrap" aria-label="General" checked />
            <div role="tabpanel" class="tab-content bg-base-100 px-6 py-3 border-base-300 rounded-box rounded-tl-none">
              <ExtensionToggle />
            </div>
            <input
              type="radio"
              name="options_tabs"
              role="tab"
              class="tab text-nowrap"
              aria-label="Fap Titans Account"
            />
            <div role="tabpanel" class="tab-content bg-base-100 px-6 py-3 border-base-300 rounded-box rounded-tl-none">
              <Account />
            </div>
            <input type="radio" name="options_tabs" role="tab" class="tab text-nowrap" aria-label="Quality of Life" />
            <div role="tabpanel" class="tab-content bg-base-100 px-6 py-3 border-base-300 rounded-box rounded-tl-none">
              <HeroPiecesIconToggle />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
