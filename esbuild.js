const esbuild = require("esbuild");
const copyStaticFiles = require("esbuild-copy-static-files");

// Get the environment
const isProduction = process.env.NODE_ENV === "production";

// Base configuration to compile the project
const baseConfig = {
  entryPoints: {
    index: "src/index.html",
    bundle: "src/index.tsx",
  },
  bundle: true,
  outdir: "public",
  loader: { ".html": "copy" },
  treeShaking: true,
  plugins: [
    {
      name: "rebuild-notify",
      setup(build) {
        build.onEnd((_) => {
          console.log(`Build completed.`);
        });
      },
    },
    copyStaticFiles({
      src: "./src/static",
      dest: "./public",
      dereference: true,
      errorOnExist: false,
      preserveTimestamps: true,
      recursive: true,
    }),
  ],
};

// Configuration for development and production
const config = {
  ...baseConfig,
  inject: isProduction ? [] : ["src/livereload.js"],
  sourcemap: !isProduction,
  minify: isProduction,
};

// Start the build
if (!isProduction) {
  esbuild
    .context(config)
    .then((ctx) => {
      // Start the watch mode
      ctx.watch();

      // Start the server
      ctx
        .serve({
          servedir: "public",
          port: 8000,
        })
        .then((server) => {
          console.log(
            `Server started on http://localhost:${server.host}:${server.port}`
          );
        });
    })
    .catch(() => process.exit(1));
} else {
  esbuild.build(config).catch(() => process.exit(1));
}
