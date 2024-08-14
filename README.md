# react-esbuild

Base project with esbuild and typescript for simple react apps.

The goal is to provide a minimal project setup for quickly adding interactivity to a backend or fullstack project.
This setup can also serve as the foundation for a larger frontend project, leveraging esbuild's plugins and toolchain.

## Getting started

Install all dependencies and run the start or build script.

```bash
yarn # Install everything
yarn start # Start esbuild with --watch and reload-server on port 8000
yarn build # Or start esbuild build with minify and optimizations
```

The soruce code is in ./src with the index.tsx as entry point. The ./src/static will be copied recursivly into ./public. Everything will be placed in `./public` and can be served from there.

### CSS

With esbuild you can use .module.css files in JavaScript ([learn more here](https://esbuild.github.io/content-types/#css)). For postcss or autoprefixer check out any of the esbuild CSS plugins.

#### With SCSS

Soon!

#### With tailwindcss

You can also add tailwindcss to the project by running:

```bash
yarn add -D tailwindcss npm-run-all
npx tailwindcss init
touch src/style.css
```

This adds everything needed for tailwindcss (cli-usage) in this project. We also install `npm-run-all` to run esbuild and tailwind in paralell.

From here follow the instructions in the [tailwindcss docs](https://tailwindcss.com/docs/installation), most importantly updating the tailwind.config.js:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Update the "scripts" in the package.json like this:

```json
...
"scripts": {
    "start:js": "node esbuild.js",
    "build:js": "NODE_ENV=production node esbuild.js",
    "start:css": "npx tailwindcss -i ./src/style.css -o ./public/style.css --watch",
    "build:css": "npx tailwindcss -i ./src/style.css -o ./public/style.css --minify",
    "start": "npm-run-all --parallel start:js start:css",
    "build": "rimraf ./public && npm-run-all build:js build:css"
}
...
```

With this change you can still use the same commands:

```bash
yarn start # Start esbuild and tailwindcss with --watch and reload-server on port 8000
yarn build # Or start esbuild and tailwindcss with minify and optimizations
```
