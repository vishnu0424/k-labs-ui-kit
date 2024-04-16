import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { babel } from "@rollup/plugin-babel";

// Define the list of Material-UI modules to ignore
const ignoredModules = [
  "@mui/material",
  "@mui/icons-material",
  "react-router-dom",
];

export default {
  input: "index.js",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: false,
    },
    {
      file: "dist/index.es.js",
      format: "es",
      exports: "named",
    },
  ],
  external: (id) => {
    // Check if the module ID matches any of the ignored modules
    return ignoredModules.some((moduleName) => id.startsWith(moduleName));
  },
  plugins: [
    peerDepsExternal(),
    nodeResolve({
      extensions: [".js", ".jsx"],
    }),
    commonjs(),
    terser(),
    postcss({
      plugins: [],
      minimize: true,
      extract: "style.css",
    }),
    babel({
      configFile: "./.babelrc",
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
  ],
};
