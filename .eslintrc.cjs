/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: [
    'eslint:recommended',
    "plugin:astro/recommended",
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/strict-type-checked',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: [
    '@typescript-eslint'
  ],
  root: true,
  env: {
    node: true,
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'coverage/',
    '.eslintrc.cjs',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    "import/extensions": [
        "error",
        "ignorePackages"
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true
      }
    ],
    "import/prefer-default-export": "off",
    "max-len": [
      "error",
      {
        "code": 120,
        "ignoreComments": true,
      }
    ],
  },
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      processor: "astro/client-side-ts",
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
  ],
}
