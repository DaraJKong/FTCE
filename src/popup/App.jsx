import packageJson from "/package.json";
import ftceLogo from "/logo.svg";
import ExtensionToggle from "/src/lib/ExtensionToggle";
import HeroPiecesIconToggle from "/src/lib/HeroPiecesIconToggle";

const { description } = packageJson;

export default function App() {
  return (
    <main>
      <div class="w-full flex items-center px-6 py-3 border-b border-neutral">
        <img src={ftceLogo} alt="logo" class="size-12 mr-4" />
        <h1 class="grow text-lg font-medium text-primary">{description}</h1>
      </div>
      <div class="w-full px-6 py-3">
        <ExtensionToggle />
      </div>
      <div class="w-full px-6 py-3">
        <HeroPiecesIconToggle />
      </div>
      <div class="w-full flex justify-center px-6 border-t border-neutral">
        <button class="btn btn-link text-accent" onclick={() => chrome.runtime.openOptionsPage()}>
          Open the options page 🡕
        </button>
      </div>
    </main>
  );
}
