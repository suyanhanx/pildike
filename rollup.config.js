import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import { uglify } from "rollup-plugin-uglify";
import replace from "rollup-plugin-replace";

const env = process.env.NODE_ENV;

const plugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify(env)
  }),
  babel({
    exclude: "node_modules/**",
    plugins: ["external-helpers"]
  }),
  resolve({
    browser: true
  }),
  commonjs({
    include: ["node_modules/**"],
    exclude: ["node_modules/process-es6/**"]
  })
];

if (env === "production")
  plugins.push(
    uglify({
      compress: true
    })
  );

export default {
  input: "./index.js",
  output: {
    file: "build/bundle.min.js",
    format: "cjs"
  },
  plugins: plugins
};
