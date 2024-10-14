const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/handler.ts"],
    outfile: "dist/handler.js",
    platform: "node",
    target: "node20",
    bundle: true,
    minify: true,
    sourcemap: true,
    external: [],
  })
  .then(() => {
    console.log("Build completed");
  })
  .catch((error) => {
    console.error("Build failed", error);
  });
