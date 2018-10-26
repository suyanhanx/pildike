import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import replace from "rollup-plugin-replace";

const env = process.env.NODE_ENV;

const plugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify(env)
  }),
  babel({
    exclude: "node_modules/**"
  }),
  resolve({
    browser: true
  }),
  commonjs({
    include: ["node_modules/**"]
  })
];

if (env === "production") plugins.push(terser({ ecma: 6 }));

export default {
  input: "./index.js",
  output: {
    file: "build/bundle.min.js",
    format: "cjs"
  },
  plugins: plugins
};
