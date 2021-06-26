# Instabug Youtube <3

> Instabug Youtube FE Task

## Perquisites

- Node.js 12 or higher

## Overview

The project is using the following tools/technologies:

- Nuxt.js
- Vuejs
- SASS

For more information about the directory structure, [consult `Nuxt.js` documentation](https://nuxtjs.org/guide/directory-structure/).

There are other non-standard Nuxt.js directories:

| Directory       | Description                                                                |
| --------------- | -------------------------------------------------------------------------- |
| `pages`         | Nuxt provides auto routing pages directory                                 |
| `plugins`       | Contains the app plugins that we'll work with                              |
| `utils`         | Contains generic utility files, utils are grouped by their function domain |
| `assets/sprite` | Contains app svg icons, accessed by `@nuxtjs/svg-sprite`                   |

## Setup

Prepare your `.env` file by copying the contents of `.env.example`:

```bash
cp .env.example .env
```

After filling the `.env` content, you can proceed to installing dependencies.

This project uses `yarn` to maintain its dependencies, if you do not have it you can install it [from here](https://yarnpkg.com).

```bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn dev

# build production assets
$ yarn build

# launch production app server
$ yarn start
```

## Scripts

There are the available scripts you can run with:

```bash
yarn {script-name}

# OR

npm run {script-name}
```

| name   | example       | Description                                                                                      |
| ------ | ------------- | ------------------------------------------------------------------------------------------------|
| dev    | `yarn dev`    | launches a development server with hot reload                        |
| build  | `yarn build`  | builds a production artifact                                         |
| start  | `yarn start`  | Starts a production server (requires running `build` before this one)|
| lint   | `yarn lint`   | Runs eslint across the project files (add --fix flag to attempt to fix the issues automatically) |
| format | `yarn format` | Runs prettier formatter across the project files                     |
| deploy | `yarn deploy` | Runs the project in production mode via docker on the current machine |

Other scripts that may exist in the `package.json` should not be used on it's own as they are sub-scripts of the ones mentioned here.

## Environment Variables

| Variable             | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| API_URL              | The URL of the Youtube Data API                    |
| API_KEY              | The key of the Youtube Data API                    |

## Code Style

We use both eslint and prettier to ensure consistent coding style, be sure to configure your editor to utilize them for better experience.

The primary style guide we are using is [Vue's official style guide](https://vuejs.org/v2/style-guide/).

The style is enforced as both a pre-commit git hook using `husky` and as a ci job running after commits are pushed on gitlab.
