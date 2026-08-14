# Quoter Bot

<p align="center">
    <img
        alt="Quoter logo"
        height="96px"
        src="./assets/icons/quote.png"
        width="96px"
    />
</p>

<h3 align="center">A Telegram bot that displays famous quotes</h3>

## Tech Stack

<p align="center">
    <img alt="Built with Rolldown" src="https://img.shields.io/badge/Rolldown-FF4100.svg?style=for-the-badge&logo=Rolldown&logoColor=white" />
    <img alt="Formatted with Prettier" src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=for-the-badge&logo=Prettier&logoColor=black" />
    <img alt="Installed with pnpm" src="https://img.shields.io/badge/pnpm-F69220.svg?style=for-the-badge&logo=pnpm&logoColor=white" />
    <img alt="Linted with ESLint" src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=for-the-badge&logo=ESLint&logoColor=white" />
    <img alt="Run on Node.js" src="https://img.shields.io/badge/Node.js-5FA04E.svg?style=for-the-badge&logo=nodedotjs&logoColor=white" />
    <img alt="Telegram Bot" src="https://img.shields.io/badge/Telegram-26A5E4.svg?style=for-the-badge&logo=Telegram&logoColor=white" />
    <img alt="Tested with Vitest" src="https://img.shields.io/badge/Vitest-6E9F18.svg?style=for-the-badge&logo=Vitest&logoColor=white" />
    <img alt="Written with Redis" src="https://img.shields.io/badge/Redis-FF4438.svg?style=for-the-badge&logo=Redis&logoColor=white" />
    <img alt="Written with TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" />
    <img alt="Written with Upstash" src="https://img.shields.io/badge/Upstash-00E9A3.svg?style=for-the-badge&logo=Upstash&logoColor=white" />
</p>

## Overview

This is a Telegram bot that displays famous quotes.

## Requirements

- `Node.js` runtime environment for running the bot.
- `pnpm` package manager for installing dependencies.

## Prerequisites

Before setting up the bot, make sure you have:

1. A [Telegram account](https://telegram.org/).
2. Created a bot on Telegram via
   [BotFather](https://core.telegram.org/bots#botfather).
3. A token from BotFather to authenticate your bot.
4. A Redis storage on [Upstash](https://upstash.com/).

## Installation

Follow these steps to set up the bot:

1. Clone the repository:

    ```bash
    git clone https://github.com/madliani/quoter-bot.git
    cd quoter-bot
    ```

2. Install the dependencies:

    ```bash
    pnpm install
    ```

3. Set up your bot token, your storage token and your storage URL:

    Create a `.env` file in the root directory and add the following lines:

    ```bash
    FREQUENCY=your-frequency-in-minutes
    TELEGRAM_BOT_TOKEN=your-bot-token
    UPSTASH_REDIS_REST_TOKEN=your-storage-token
    UPSTASH_REDIS_REST_URL=your-storage-url
    ```

4. Run the tests:

    ```bash
    pnpm test
    ```

5. Build the bot:

    ```bash
    pnpm build:release
    ```

6. Start the bot:

    ```bash
    pnpm start:release
    ```

## Usage

The bot supports the following commands:

- `/bookmarks`: to view bookmarks.
- `/clearbookmarks`: to clear bookmarks.
- `/deletebookmark <a bookmark index>`: to delete a bookmark by index.
- `/help`: to get help with the bot.
- `/savebookmark`: to save the last quote.
- `/start`: to start the bot.
- `/stop`: to stop the bot activity.

## Project Structure

- `assets/`: a directory containing assets for the `README.md` file.
    - `assets/icons/`: a directory containing icons for the `README.md` file.
        - `assets/icons/quoter.png`: the bot icon.
- `bot/`: a directory containing source files for the bot.
    - `bot/assets/`: a directory containing the assets for the bot.
        - `bot/assets/json/`: a directory containing the texts for the bot UI.
    - `bot/lib/`: a directory containing the libraries for the bot.
    - `bot/bot.ts`: a file containing the application.
- `lib/`: a directory containing source files for the libraries.
- `src/`: a directory containing the entry point of the program.
    - `src/types/`: a directory containing the type declarations for the entry
      point of the program.
    - `src/main.ts`: a file containing the entry point of the program.
- `types/`: a directory containing the type declarations for the configuration
  files.
- `.env`: an environment variables file.
- `.gitattributes`: a `Git` attributes file.
- `.gitignore`: a `Git` ignore file.
- `.prettierignore`: a `Prettier` ignore file.
- `AUTHORS.txt`: a `AUTHORS` file.
- `CHANGELOG.md`: a `CHANGELOG.md` file.
- `CONTRIBUTING.md`: a `CONTRIBUTING.md` file.
- `cspell.config.js`: a JavaScript-based `cSpell` configuration file.
- `eslint.config.js`: a JavaScript-based `ESLint` configuration file.
- `LICENSE.txt`: a license file.
- `package.json`: a `package.json` file.
- `pnpm-lock.yaml`: a `pnpm` lockfile.
- `pnpm-workspace.yaml`: a `pnpm` Workspace file.
- `prettier.config.js`: a JavaScript-based `Prettier` configuration file.
- `README.md`: a `README` file.
- `tsconfig.app.json`: a `TypeScript` configuration file for the bot.
- `tsconfig.json`: a base `TypeScript` configuration file.
- `tsconfig.json`: a main `TypeScript` configuration file.
- `tsdown.config.js`: a JavaScript-based `tsdown` configuration file.
- `vitest.config.js`: a JavaScript-based `Vitest` configuration file.

## Branches

- `stable`: a stable branch for production build.
- `unstable`: an unstable branch for development and testing.

## FAQs

<details>
<summary>Under what license is the project's source code distributed?</summary>

The project is distributed under [Unlicense license](./LICENSE.txt).

</details>

<details>
<summary>How do I start contributing to the project?</summary>

To learn about contributing to the project, see
[CONTRIBUTING.md](./CONTRIBUTING.md).

</details>

<details>
<summary>Why are some development dependencies necessary?</summary>

These dependencies are necessary for other dependencies to work correctly.

| Dependency | Description                  |
| ---------- | ---------------------------- |
| tslib      | Dependency for `typescript`. |

</details>

## Attributions

- **Quote icon** (`./assets/icons/quote.png`) created by Nick Roach and licensed
  under [GPLv3](https://www.gnu.org/licenses/gpl-3.0.html).
- The source of quotes is [Quotepark.com](https://quotepark.com/).
