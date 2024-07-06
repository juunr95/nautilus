import globals from "globals";
import pluginJs from "@eslint/js";

import jest from 'eslint-plugin-jest';


export default [
  {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
  {plugins: { jest }, rules: {...jest.configs.recommended.rules,}, languageOptions: {globals: {...globals.jest,}}},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
];