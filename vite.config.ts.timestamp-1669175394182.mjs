// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path3, { resolve as resolve3 } from "path";

// utils/plugins/make-manifest.ts
import * as fs from "fs";
import * as path from "path";

// utils/log.ts
function colorLog(message, type) {
  let color = type || COLORS.FgBlack;
  switch (type) {
    case "success":
      color = COLORS.FgGreen;
      break;
    case "info":
      color = COLORS.FgBlue;
      break;
    case "error":
      color = COLORS.FgRed;
      break;
    case "warning":
      color = COLORS.FgYellow;
      break;
  }
  console.log(color, message);
}
var COLORS = {
  Reset: "\x1B[0m",
  Bright: "\x1B[1m",
  Dim: "\x1B[2m",
  Underscore: "\x1B[4m",
  Blink: "\x1B[5m",
  Reverse: "\x1B[7m",
  Hidden: "\x1B[8m",
  FgBlack: "\x1B[30m",
  FgRed: "\x1B[31m",
  FgGreen: "\x1B[32m",
  FgYellow: "\x1B[33m",
  FgBlue: "\x1B[34m",
  FgMagenta: "\x1B[35m",
  FgCyan: "\x1B[36m",
  FgWhite: "\x1B[37m",
  BgBlack: "\x1B[40m",
  BgRed: "\x1B[41m",
  BgGreen: "\x1B[42m",
  BgYellow: "\x1B[43m",
  BgBlue: "\x1B[44m",
  BgMagenta: "\x1B[45m",
  BgCyan: "\x1B[46m",
  BgWhite: "\x1B[47m"
};

// utils/manifest-parser/index.ts
var ManifestParser = class {
  constructor() {
  }
  static convertManifestToString(manifest2) {
    return JSON.stringify(manifest2, null, 2);
  }
};
var manifest_parser_default = ManifestParser;

// utils/plugins/make-manifest.ts
var __vite_injected_original_dirname = "/app/utils/plugins";
var { resolve } = path;
var outDir = resolve(__vite_injected_original_dirname, "..", "..", "public");
function makeManifest(manifest2) {
  return {
    name: "make-manifest",
    buildEnd() {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }
      const manifestPath = resolve(outDir, "manifest.json");
      fs.writeFileSync(
        manifestPath,
        manifest_parser_default.convertManifestToString(manifest2)
      );
      colorLog(`Manifest file copy complete: ${manifestPath}`, "success");
    }
  };
}

// utils/plugins/custom-dynamic-import.ts
function customDynamicImport() {
  return {
    name: "custom-dynamic-import",
    renderDynamicImport() {
      return {
        left: `
        {
          const dynamicImport = (path) => import(path);
          dynamicImport(
          `,
        right: ")}"
      };
    }
  };
}

// utils/plugins/add-hmr.ts
import * as path2 from "path";
import { readFileSync } from "fs";
var __vite_injected_original_dirname2 = "/app/utils/plugins";
var isDev = process.env.__DEV__ === "true";
var DUMMY_CODE = `export default function(){};`;
function getInjectionCode(fileName) {
  return readFileSync(
    path2.resolve(__vite_injected_original_dirname2, "..", "reload", "injections", fileName),
    { encoding: "utf8" }
  );
}
function addHmr(config) {
  const { background = false, view = true } = config || {};
  const idInBackgroundScript = "virtual:reload-on-update-in-background-script";
  const idInView = "virtual:reload-on-update-in-view";
  const scriptHmrCode = isDev ? getInjectionCode("script.js") : DUMMY_CODE;
  const viewHmrCode = isDev ? getInjectionCode("view.js") : DUMMY_CODE;
  return {
    name: "add-hmr",
    resolveId(id) {
      if (id === idInBackgroundScript || id === idInView) {
        return getResolvedId(id);
      }
    },
    load(id) {
      if (id === getResolvedId(idInBackgroundScript)) {
        return background ? scriptHmrCode : DUMMY_CODE;
      }
      if (id === getResolvedId(idInView)) {
        return view ? viewHmrCode : DUMMY_CODE;
      }
    }
  };
}
function getResolvedId(id) {
  return "\0" + id;
}

// package.json
var package_default = {
  name: "chrome-extension-boilerplate-react-vite",
  version: "0.0.1",
  description: "chrome extension boilerplate",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite.git"
  },
  scripts: {
    build: "tsc --noEmit && vite build",
    "build:hmr": "rollup --config utils/reload/rollup.config.ts",
    wss: "node utils/reload/initReloadServer.js",
    dev: "npm run build:hmr && (npm run wss & nodemon)",
    test: "jest",
    lint: "eslint ./src --ext .ts,.tsx",
    "lint:fix": "eslint ./src --ext .ts,.tsx --fix"
  },
  type: "module",
  dependencies: {
    "@ramonak/react-progress-bar": "^5.0.3",
    "@tanstack/react-query": "^4.3.4",
    axios: "^1.1.3",
    moment: "^2.29.4",
    react: "18.2.0",
    "react-dom": "18.2.0",
    "typescript-plugin-css-modules": "^3.4.0"
  },
  devDependencies: {
    "@rollup/plugin-typescript": "^8.5.0",
    "@testing-library/react": "13.4.0",
    "@types/axios": "^0.14.0",
    "@types/chrome": "0.0.197",
    "@types/jest": "29.0.3",
    "@types/node": "18.7.23",
    "@types/react": "18.0.21",
    "@types/react-dom": "18.0.6",
    "@types/ws": "^8.5.3",
    "@typescript-eslint/eslint-plugin": "5.38.1",
    "@typescript-eslint/parser": "5.38.1",
    "@vitejs/plugin-react": "2.1.0",
    chokidar: "^3.5.3",
    eslint: "8.24.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "4.2.1",
    "eslint-plugin-react": "7.31.8",
    "fs-extra": "10.1.0",
    jest: "29.0.3",
    "jest-environment-jsdom": "29.0.3",
    nodemon: "2.0.20",
    prettier: "2.7.1",
    rollup: "2.79.1",
    sass: "1.55.0",
    "ts-jest": "29.0.2",
    "ts-loader": "9.4.1",
    typescript: "4.8.3",
    vite: "3.1.3",
    ws: "8.9.0"
  }
};

// manifest.ts
var manifest = {
  manifest_version: 3,
  name: package_default.name,
  version: package_default.version,
  description: package_default.description,
  options_page: "src/pages/options/index.html",
  background: { service_worker: "src/pages/background/index.js" },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: "icon-34.png"
  },
  chrome_url_overrides: {
    newtab: "src/pages/newtab/index.html"
  },
  icons: {
    "128": "icon-128.png"
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.js"],
      css: ["assets/css/contentStyle.chunk.css"],
      run_at: "document_start"
    }
  ],
  devtools_page: "src/pages/devtools/index.html",
  permissions: ["storage"],
  web_accessible_resources: [
    {
      resources: [
        "assets/js/*.js",
        "assets/css/*.css",
        "icon-128.png",
        "icon-34.png"
      ],
      matches: ["*://*/*"]
    }
  ]
};
var manifest_default = manifest;

// vite.config.ts
var __vite_injected_original_dirname3 = "/app";
var root = resolve3(__vite_injected_original_dirname3, "src");
var pagesDir = resolve3(root, "pages");
var assetsDir = resolve3(root, "assets");
var outDir2 = resolve3(__vite_injected_original_dirname3, "dist");
var publicDir = resolve3(__vite_injected_original_dirname3, "public");
var isDev2 = process.env.__DEV__ === "true";
var enableHmrInBackgroundScript = true;
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  server: {
    port: 7852
  },
  preview: {
    port: 7852
  },
  plugins: [
    react(),
    makeManifest(manifest_default),
    customDynamicImport(),
    addHmr({ background: enableHmrInBackgroundScript, view: true })
  ],
  publicDir,
  build: {
    outDir: outDir2,
    sourcemap: isDev2,
    rollupOptions: {
      input: {
        devtools: resolve3(pagesDir, "devtools", "index.html"),
        panel: resolve3(pagesDir, "panel", "index.html"),
        content: resolve3(pagesDir, "content", "index.ts"),
        background: resolve3(pagesDir, "background", "index.ts"),
        contentStyle: resolve3(pagesDir, "content", "style.scss"),
        popup: resolve3(pagesDir, "popup", "index.html"),
        newtab: resolve3(pagesDir, "newtab", "index.html"),
        options: resolve3(pagesDir, "options", "index.html")
      },
      output: {
        entryFileNames: "src/pages/[name]/index.js",
        chunkFileNames: isDev2 ? "assets/js/[name].js" : "assets/js/[name].[hash].js",
        assetFileNames: (assetInfo) => {
          const { dir, name: _name } = path3.parse(assetInfo.name);
          const assetFolder = getLastElement(dir.split("/"));
          const name = assetFolder + firstUpperCase(_name);
          return `assets/[ext]/${name}.chunk.[ext]`;
        }
      }
    }
  }
});
function getLastElement(array) {
  const length = array.length;
  const lastIndex = length - 1;
  return array[lastIndex];
}
function firstUpperCase(str) {
  const firstAlphabet = new RegExp(/( |^)[a-z]/, "g");
  return str.toLowerCase().replace(firstAlphabet, (L) => L.toUpperCase());
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LnRzIiwgInV0aWxzL2xvZy50cyIsICJ1dGlscy9tYW5pZmVzdC1wYXJzZXIvaW5kZXgudHMiLCAidXRpbHMvcGx1Z2lucy9jdXN0b20tZHluYW1pYy1pbXBvcnQudHMiLCAidXRpbHMvcGx1Z2lucy9hZGQtaG1yLnRzIiwgIm1hbmlmZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2FwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2FwcC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHBhdGgsIHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IG1ha2VNYW5pZmVzdCBmcm9tICcuL3V0aWxzL3BsdWdpbnMvbWFrZS1tYW5pZmVzdCc7XG5pbXBvcnQgY3VzdG9tRHluYW1pY0ltcG9ydCBmcm9tICcuL3V0aWxzL3BsdWdpbnMvY3VzdG9tLWR5bmFtaWMtaW1wb3J0JztcbmltcG9ydCBhZGRIbXIgZnJvbSAnLi91dGlscy9wbHVnaW5zL2FkZC1obXInO1xuaW1wb3J0IG1hbmlmZXN0IGZyb20gJy4vbWFuaWZlc3QnO1xuXG5jb25zdCByb290ID0gcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKTtcbmNvbnN0IHBhZ2VzRGlyID0gcmVzb2x2ZShyb290LCAncGFnZXMnKTtcbmNvbnN0IGFzc2V0c0RpciA9IHJlc29sdmUocm9vdCwgJ2Fzc2V0cycpO1xuY29uc3Qgb3V0RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsICdkaXN0Jyk7XG5jb25zdCBwdWJsaWNEaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgJ3B1YmxpYycpO1xuXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Ll9fREVWX18gPT09ICd0cnVlJztcblxuLy8gRU5BQkxFIEhNUiBJTiBCQUNLR1JPVU5EIFNDUklQVFxuY29uc3QgZW5hYmxlSG1ySW5CYWNrZ3JvdW5kU2NyaXB0ID0gdHJ1ZTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQHNyYyc6IHJvb3QsXG4gICAgICAnQGFzc2V0cyc6IGFzc2V0c0RpcixcbiAgICAgICdAcGFnZXMnOiBwYWdlc0RpcixcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA3ODUyLFxuICB9LFxuICBwcmV2aWV3OiB7XG4gICAgcG9ydDogNzg1MixcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgbWFrZU1hbmlmZXN0KG1hbmlmZXN0KSxcbiAgICBjdXN0b21EeW5hbWljSW1wb3J0KCksXG4gICAgYWRkSG1yKHsgYmFja2dyb3VuZDogZW5hYmxlSG1ySW5CYWNrZ3JvdW5kU2NyaXB0LCB2aWV3OiB0cnVlIH0pLFxuICBdLFxuICBwdWJsaWNEaXIsXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyLFxuICAgIHNvdXJjZW1hcDogaXNEZXYsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgZGV2dG9vbHM6IHJlc29sdmUocGFnZXNEaXIsICdkZXZ0b29scycsICdpbmRleC5odG1sJyksXG4gICAgICAgIHBhbmVsOiByZXNvbHZlKHBhZ2VzRGlyLCAncGFuZWwnLCAnaW5kZXguaHRtbCcpLFxuICAgICAgICBjb250ZW50OiByZXNvbHZlKHBhZ2VzRGlyLCAnY29udGVudCcsICdpbmRleC50cycpLFxuICAgICAgICBiYWNrZ3JvdW5kOiByZXNvbHZlKHBhZ2VzRGlyLCAnYmFja2dyb3VuZCcsICdpbmRleC50cycpLFxuICAgICAgICBjb250ZW50U3R5bGU6IHJlc29sdmUocGFnZXNEaXIsICdjb250ZW50JywgJ3N0eWxlLnNjc3MnKSxcbiAgICAgICAgcG9wdXA6IHJlc29sdmUocGFnZXNEaXIsICdwb3B1cCcsICdpbmRleC5odG1sJyksXG4gICAgICAgIG5ld3RhYjogcmVzb2x2ZShwYWdlc0RpciwgJ25ld3RhYicsICdpbmRleC5odG1sJyksXG4gICAgICAgIG9wdGlvbnM6IHJlc29sdmUocGFnZXNEaXIsICdvcHRpb25zJywgJ2luZGV4Lmh0bWwnKSxcbiAgICAgIH0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdzcmMvcGFnZXMvW25hbWVdL2luZGV4LmpzJyxcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6IGlzRGV2XG4gICAgICAgICAgPyAnYXNzZXRzL2pzL1tuYW1lXS5qcydcbiAgICAgICAgICA6ICdhc3NldHMvanMvW25hbWVdLltoYXNoXS5qcycsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAoYXNzZXRJbmZvKSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBkaXIsIG5hbWU6IF9uYW1lIH0gPSBwYXRoLnBhcnNlKGFzc2V0SW5mby5uYW1lKTtcbiAgICAgICAgICBjb25zdCBhc3NldEZvbGRlciA9IGdldExhc3RFbGVtZW50KGRpci5zcGxpdCgnLycpKTtcbiAgICAgICAgICBjb25zdCBuYW1lID0gYXNzZXRGb2xkZXIgKyBmaXJzdFVwcGVyQ2FzZShfbmFtZSk7XG4gICAgICAgICAgcmV0dXJuIGBhc3NldHMvW2V4dF0vJHtuYW1lfS5jaHVuay5bZXh0XWA7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcblxuZnVuY3Rpb24gZ2V0TGFzdEVsZW1lbnQ8VD4oYXJyYXk6IEFycmF5TGlrZTxUPik6IFQge1xuICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIGNvbnN0IGxhc3RJbmRleCA9IGxlbmd0aCAtIDE7XG4gIHJldHVybiBhcnJheVtsYXN0SW5kZXhdO1xufVxuXG5mdW5jdGlvbiBmaXJzdFVwcGVyQ2FzZShzdHI6IHN0cmluZykge1xuICBjb25zdCBmaXJzdEFscGhhYmV0ID0gbmV3IFJlZ0V4cCgvKCB8XilbYS16XS8sICdnJyk7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKS5yZXBsYWNlKGZpcnN0QWxwaGFiZXQsIChMKSA9PiBMLnRvVXBwZXJDYXNlKCkpO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwL3V0aWxzL3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9hcHAvdXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9hcHAvdXRpbHMvcGx1Z2lucy9tYWtlLW1hbmlmZXN0LnRzXCI7aW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgY29sb3JMb2cgZnJvbSBcIi4uL2xvZ1wiO1xuaW1wb3J0IHsgUGx1Z2luT3B0aW9uIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBNYW5pZmVzdFBhcnNlciBmcm9tIFwiLi4vbWFuaWZlc3QtcGFyc2VyXCI7XG5cbmNvbnN0IHsgcmVzb2x2ZSB9ID0gcGF0aDtcblxuY29uc3Qgb3V0RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi5cIiwgXCIuLlwiLCBcInB1YmxpY1wiKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZU1hbmlmZXN0KFxuICBtYW5pZmVzdDogY2hyb21lLnJ1bnRpbWUuTWFuaWZlc3RWM1xuKTogUGx1Z2luT3B0aW9uIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBcIm1ha2UtbWFuaWZlc3RcIixcbiAgICBidWlsZEVuZCgpIHtcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhvdXREaXIpKSB7XG4gICAgICAgIGZzLm1rZGlyU3luYyhvdXREaXIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtYW5pZmVzdFBhdGggPSByZXNvbHZlKG91dERpciwgXCJtYW5pZmVzdC5qc29uXCIpO1xuXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKFxuICAgICAgICBtYW5pZmVzdFBhdGgsXG4gICAgICAgIE1hbmlmZXN0UGFyc2VyLmNvbnZlcnRNYW5pZmVzdFRvU3RyaW5nKG1hbmlmZXN0KVxuICAgICAgKTtcblxuICAgICAgY29sb3JMb2coYE1hbmlmZXN0IGZpbGUgY29weSBjb21wbGV0ZTogJHttYW5pZmVzdFBhdGh9YCwgXCJzdWNjZXNzXCIpO1xuICAgIH0sXG4gIH07XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9hcHAvdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9hcHAvdXRpbHMvbG9nLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9hcHAvdXRpbHMvbG9nLnRzXCI7dHlwZSBDb2xvclR5cGUgPSBcInN1Y2Nlc3NcIiB8IFwiaW5mb1wiIHwgXCJlcnJvclwiIHwgXCJ3YXJuaW5nXCIgfCBrZXlvZiB0eXBlb2YgQ09MT1JTO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb2xvckxvZyhtZXNzYWdlOiBzdHJpbmcsIHR5cGU/OiBDb2xvclR5cGUpIHtcbiAgbGV0IGNvbG9yOiBzdHJpbmcgPSB0eXBlIHx8IENPTE9SUy5GZ0JsYWNrO1xuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgXCJzdWNjZXNzXCI6XG4gICAgICBjb2xvciA9IENPTE9SUy5GZ0dyZWVuO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImluZm9cIjpcbiAgICAgIGNvbG9yID0gQ09MT1JTLkZnQmx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJlcnJvclwiOlxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdSZWQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwid2FybmluZ1wiOlxuICAgICAgY29sb3IgPSBDT0xPUlMuRmdZZWxsb3c7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIGNvbnNvbGUubG9nKGNvbG9yLCBtZXNzYWdlKTtcbn1cblxuY29uc3QgQ09MT1JTID0ge1xuICBSZXNldDogXCJcXHgxYlswbVwiLFxuICBCcmlnaHQ6IFwiXFx4MWJbMW1cIixcbiAgRGltOiBcIlxceDFiWzJtXCIsXG4gIFVuZGVyc2NvcmU6IFwiXFx4MWJbNG1cIixcbiAgQmxpbms6IFwiXFx4MWJbNW1cIixcbiAgUmV2ZXJzZTogXCJcXHgxYls3bVwiLFxuICBIaWRkZW46IFwiXFx4MWJbOG1cIixcbiAgRmdCbGFjazogXCJcXHgxYlszMG1cIixcbiAgRmdSZWQ6IFwiXFx4MWJbMzFtXCIsXG4gIEZnR3JlZW46IFwiXFx4MWJbMzJtXCIsXG4gIEZnWWVsbG93OiBcIlxceDFiWzMzbVwiLFxuICBGZ0JsdWU6IFwiXFx4MWJbMzRtXCIsXG4gIEZnTWFnZW50YTogXCJcXHgxYlszNW1cIixcbiAgRmdDeWFuOiBcIlxceDFiWzM2bVwiLFxuICBGZ1doaXRlOiBcIlxceDFiWzM3bVwiLFxuICBCZ0JsYWNrOiBcIlxceDFiWzQwbVwiLFxuICBCZ1JlZDogXCJcXHgxYls0MW1cIixcbiAgQmdHcmVlbjogXCJcXHgxYls0Mm1cIixcbiAgQmdZZWxsb3c6IFwiXFx4MWJbNDNtXCIsXG4gIEJnQmx1ZTogXCJcXHgxYls0NG1cIixcbiAgQmdNYWdlbnRhOiBcIlxceDFiWzQ1bVwiLFxuICBCZ0N5YW46IFwiXFx4MWJbNDZtXCIsXG4gIEJnV2hpdGU6IFwiXFx4MWJbNDdtXCIsXG59IGFzIGNvbnN0O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwL3V0aWxzL21hbmlmZXN0LXBhcnNlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2FwcC91dGlscy9tYW5pZmVzdC1wYXJzZXIvaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2FwcC91dGlscy9tYW5pZmVzdC1wYXJzZXIvaW5kZXgudHNcIjt0eXBlIE1hbmlmZXN0ID0gY2hyb21lLnJ1bnRpbWUuTWFuaWZlc3RWMztcblxuY2xhc3MgTWFuaWZlc3RQYXJzZXIge1xuICAvKiogU0lOR0xFVE9OICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb25cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgc3RhdGljIGNvbnZlcnRNYW5pZmVzdFRvU3RyaW5nKG1hbmlmZXN0OiBNYW5pZmVzdCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG1hbmlmZXN0LCBudWxsLCAyKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNYW5pZmVzdFBhcnNlcjtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2FwcC91dGlscy9wbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvYXBwL3V0aWxzL3BsdWdpbnMvY3VzdG9tLWR5bmFtaWMtaW1wb3J0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9hcHAvdXRpbHMvcGx1Z2lucy9jdXN0b20tZHluYW1pYy1pbXBvcnQudHNcIjtpbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjdXN0b21EeW5hbWljSW1wb3J0KCk6IFBsdWdpbk9wdGlvbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJjdXN0b20tZHluYW1pYy1pbXBvcnRcIixcbiAgICByZW5kZXJEeW5hbWljSW1wb3J0KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbGVmdDogYFxuICAgICAgICB7XG4gICAgICAgICAgY29uc3QgZHluYW1pY0ltcG9ydCA9IChwYXRoKSA9PiBpbXBvcnQocGF0aCk7XG4gICAgICAgICAgZHluYW1pY0ltcG9ydChcbiAgICAgICAgICBgLFxuICAgICAgICByaWdodDogXCIpfVwiLFxuICAgICAgfTtcbiAgICB9LFxuICB9O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwL3V0aWxzL3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9hcHAvdXRpbHMvcGx1Z2lucy9hZGQtaG1yLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9hcHAvdXRpbHMvcGx1Z2lucy9hZGQtaG1yLnRzXCI7aW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgUGx1Z2luT3B0aW9uIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gXCJmc1wiO1xuXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Ll9fREVWX18gPT09IFwidHJ1ZVwiO1xuXG5jb25zdCBEVU1NWV9DT0RFID0gYGV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCl7fTtgO1xuXG5mdW5jdGlvbiBnZXRJbmplY3Rpb25Db2RlKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcmVhZEZpbGVTeW5jKFxuICAgIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi5cIiwgXCJyZWxvYWRcIiwgXCJpbmplY3Rpb25zXCIsIGZpbGVOYW1lKSxcbiAgICB7IGVuY29kaW5nOiBcInV0ZjhcIiB9XG4gICk7XG59XG5cbnR5cGUgQ29uZmlnID0ge1xuICBiYWNrZ3JvdW5kPzogYm9vbGVhbjtcbiAgdmlldz86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhZGRIbXIoY29uZmlnPzogQ29uZmlnKTogUGx1Z2luT3B0aW9uIHtcbiAgY29uc3QgeyBiYWNrZ3JvdW5kID0gZmFsc2UsIHZpZXcgPSB0cnVlIH0gPSBjb25maWcgfHwge307XG4gIGNvbnN0IGlkSW5CYWNrZ3JvdW5kU2NyaXB0ID0gXCJ2aXJ0dWFsOnJlbG9hZC1vbi11cGRhdGUtaW4tYmFja2dyb3VuZC1zY3JpcHRcIjtcbiAgY29uc3QgaWRJblZpZXcgPSBcInZpcnR1YWw6cmVsb2FkLW9uLXVwZGF0ZS1pbi12aWV3XCI7XG5cbiAgY29uc3Qgc2NyaXB0SG1yQ29kZSA9IGlzRGV2ID8gZ2V0SW5qZWN0aW9uQ29kZShcInNjcmlwdC5qc1wiKSA6IERVTU1ZX0NPREU7XG4gIGNvbnN0IHZpZXdIbXJDb2RlID0gaXNEZXYgPyBnZXRJbmplY3Rpb25Db2RlKFwidmlldy5qc1wiKSA6IERVTU1ZX0NPREU7XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBcImFkZC1obXJcIixcbiAgICByZXNvbHZlSWQoaWQpIHtcbiAgICAgIGlmIChpZCA9PT0gaWRJbkJhY2tncm91bmRTY3JpcHQgfHwgaWQgPT09IGlkSW5WaWV3KSB7XG4gICAgICAgIHJldHVybiBnZXRSZXNvbHZlZElkKGlkKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGxvYWQoaWQpIHtcbiAgICAgIGlmIChpZCA9PT0gZ2V0UmVzb2x2ZWRJZChpZEluQmFja2dyb3VuZFNjcmlwdCkpIHtcbiAgICAgICAgcmV0dXJuIGJhY2tncm91bmQgPyBzY3JpcHRIbXJDb2RlIDogRFVNTVlfQ09ERTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlkID09PSBnZXRSZXNvbHZlZElkKGlkSW5WaWV3KSkge1xuICAgICAgICByZXR1cm4gdmlldyA/IHZpZXdIbXJDb2RlIDogRFVNTVlfQ09ERTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRSZXNvbHZlZElkKGlkOiBzdHJpbmcpIHtcbiAgcmV0dXJuIFwiXFwwXCIgKyBpZDtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2FwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2FwcC9tYW5pZmVzdC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vYXBwL21hbmlmZXN0LnRzXCI7aW1wb3J0IHBhY2thZ2VKc29uIGZyb20gJy4vcGFja2FnZS5qc29uJztcblxuY29uc3QgbWFuaWZlc3Q6IGNocm9tZS5ydW50aW1lLk1hbmlmZXN0VjMgPSB7XG4gIG1hbmlmZXN0X3ZlcnNpb246IDMsXG4gIG5hbWU6IHBhY2thZ2VKc29uLm5hbWUsXG4gIHZlcnNpb246IHBhY2thZ2VKc29uLnZlcnNpb24sXG4gIGRlc2NyaXB0aW9uOiBwYWNrYWdlSnNvbi5kZXNjcmlwdGlvbixcbiAgb3B0aW9uc19wYWdlOiAnc3JjL3BhZ2VzL29wdGlvbnMvaW5kZXguaHRtbCcsXG4gIGJhY2tncm91bmQ6IHsgc2VydmljZV93b3JrZXI6ICdzcmMvcGFnZXMvYmFja2dyb3VuZC9pbmRleC5qcycgfSxcbiAgYWN0aW9uOiB7XG4gICAgZGVmYXVsdF9wb3B1cDogJ3NyYy9wYWdlcy9wb3B1cC9pbmRleC5odG1sJyxcbiAgICBkZWZhdWx0X2ljb246ICdpY29uLTM0LnBuZycsXG4gIH0sXG4gIGNocm9tZV91cmxfb3ZlcnJpZGVzOiB7XG4gICAgbmV3dGFiOiAnc3JjL3BhZ2VzL25ld3RhYi9pbmRleC5odG1sJyxcbiAgfSxcbiAgaWNvbnM6IHtcbiAgICAnMTI4JzogJ2ljb24tMTI4LnBuZycsXG4gIH0sXG4gIGNvbnRlbnRfc2NyaXB0czogW1xuICAgIHtcbiAgICAgIG1hdGNoZXM6IFsnaHR0cDovLyovKicsICdodHRwczovLyovKicsICc8YWxsX3VybHM+J10sXG4gICAgICBqczogWydzcmMvcGFnZXMvY29udGVudC9pbmRleC5qcyddLFxuICAgICAgY3NzOiBbJ2Fzc2V0cy9jc3MvY29udGVudFN0eWxlLmNodW5rLmNzcyddLFxuICAgICAgcnVuX2F0OiAnZG9jdW1lbnRfc3RhcnQnLFxuICAgIH0sXG4gIF0sXG4gIGRldnRvb2xzX3BhZ2U6ICdzcmMvcGFnZXMvZGV2dG9vbHMvaW5kZXguaHRtbCcsXG4gIHBlcm1pc3Npb25zOiBbJ3N0b3JhZ2UnXSxcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXG4gICAge1xuICAgICAgcmVzb3VyY2VzOiBbXG4gICAgICAgICdhc3NldHMvanMvKi5qcycsXG4gICAgICAgICdhc3NldHMvY3NzLyouY3NzJyxcbiAgICAgICAgJ2ljb24tMTI4LnBuZycsXG4gICAgICAgICdpY29uLTM0LnBuZycsXG4gICAgICBdLFxuICAgICAgbWF0Y2hlczogWycqOi8vKi8qJ10sXG4gICAgfSxcbiAgXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1hbmlmZXN0O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4TCxTQUFTLG9CQUFvQjtBQUMzTixPQUFPLFdBQVc7QUFDbEIsT0FBT0EsU0FBUSxXQUFBQyxnQkFBZTs7O0FDRjhNLFlBQVksUUFBUTtBQUNoUSxZQUFZLFVBQVU7OztBQ0NQLFNBQVIsU0FBMEIsU0FBaUIsTUFBa0I7QUFDbEUsTUFBSSxRQUFnQixRQUFRLE9BQU87QUFFbkMsVUFBUSxNQUFNO0FBQUEsSUFDWixLQUFLO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQSxJQUNGLEtBQUs7QUFDSCxjQUFRLE9BQU87QUFDZjtBQUFBLElBQ0YsS0FBSztBQUNILGNBQVEsT0FBTztBQUNmO0FBQUEsSUFDRixLQUFLO0FBQ0gsY0FBUSxPQUFPO0FBQ2Y7QUFBQSxFQUNK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QUFLLE1BQU0sVUFBVSxJQUFJO0FBQ3RELGdCQUFNLGNBQWMsZUFBZSxJQUFJLE1BQU0sR0FBRyxDQUFDO0FBQ2pELGdCQUFNLE9BQU8sY0FBYyxlQUFlLEtBQUs7QUFDL0MsaUJBQU8sZ0JBQWdCO0FBQUEsUUFDekI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDO0FBRUQsU0FBUyxlQUFrQixPQUF3QjtBQUNqRCxRQUFNLFNBQVMsTUFBTTtBQUNyQixRQUFNLFlBQVksU0FBUztBQUMzQixTQUFPLE1BQU07QUFDZjtBQUVBLFNBQVMsZUFBZSxLQUFhO0FBQ25DLFFBQU0sZ0JBQWdCLElBQUksT0FBTyxjQUFjLEdBQUc7QUFDbEQsU0FBTyxJQUFJLFlBQVksRUFBRSxRQUFRLGVBQWUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDO0FBQ3hFOyIsCiAgIm5hbWVzIjogWyJwYXRoIiwgInJlc29sdmUiLCAibWFuaWZlc3QiLCAibWFuaWZlc3QiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSIsICJyZXNvbHZlIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lIiwgIm91dERpciIsICJpc0RldiIsICJwYXRoIl0KfQo=
