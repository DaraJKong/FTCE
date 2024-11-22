import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { name, description, version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: env.mode !== "production" ? "[DEV] " + name : name,
  description: description,
  // up to four numbers separated by dots
  version: `${major}.${minor}.${patch}.${label}`,
  // semver is OK in "version_name"
  version_name: version,
  action: {
    default_title: name,
    default_popup: "/src/popup/index.html",
  },
  options_page: "src/options/index.html",
  icons: {
    16: "public/images/icon-16.png",
    32: "public/images/icon-32.png",
    48: "public/images/icon-48.png",
    128: "public/images/icon-128.png",
  },
  permissions: ["tabs", "storage", "webRequest", "webNavigation"],
  host_permissions: ["https://faptitans.com/*"],
  content_scripts: [
    {
      js: ["src/inject.js"],
      matches: ["https://faptitans.com/*"],
    },
  ],
  background: {
    service_worker: "src/background.js",
  },
  incognito: "split",
}));
