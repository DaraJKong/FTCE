import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.config";
// import devtools from "solid-devtools/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    crx({ manifest }),
  ],
});
