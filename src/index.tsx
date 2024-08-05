import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container!);

import Style from "./App.module.css";

const App = () => {
  return <div className={Style.myDiv}>Compiled with esbuild!</div>;
};

root.render(<App />);
