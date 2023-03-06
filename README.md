# sapcc  Web Inspector

<p align="center"><img src="https://developers.google.com/web/tools/lighthouse/images/lighthouse-logo.svg" /></p>

_sapcc Web Inspector_ is an automated product for generating [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) reports from a [user flow scripts](#user-flow-scripts).

Use this product in your [CD](https://en.wikipedia.org/wiki/Continuous_deployment) coupled with your user flow scripts to follow the evolution of your web pages performance on your project.

- [KPMG Web Inspector](#kpmg-web-inspector)
  - [Lighthouse](#lighthouse)
  - [User flow scripts](#user-flow-scripts)
    - [Script example](#script-example)
  - [Use it in your  repo_ project](#use-it-in-your-azure-devops-repo-project)
  - [Use it on your local environment](#use-it-on-your-local-environment)
  - [Contribute](#contribute)

## Lighthouse

> Lighthouse is an open-source, automated tool for improving the quality of web pages. You can run it against any web page, public or requiring authentication. It has audits for performance, accessibility, progressive web apps, SEO and more.
>
> _[Google Lighthouse website](https://developers.google.com/web/tools/lighthouse)_

First, it may be useful to refresh on [the math behind Lighthouse's metric scores and performance score](https://web.dev/performance-scoring/).

## User flow scripts

Your scripts needs to :
* Use the ECMAScript modules ([Enable it in your package.json](https://nodejs.org/docs/latest-v13.x/api/esm.html#esm_enabling)).
* Exports a `name` variable for the report name.
* Exports a `viewport` variable with the screen sized used in the flow.
* Exports a `settings` variable with the [lighthouse settings](https://github.com/GoogleChrome/lighthouse/tree/master/docs).
* Exports the `flow` function process. It takes 3 arguments:
  * `logger`: The custom logger to display info/debug/warnings/errors in the console.
  * `lighthouse`: the lighthouse instance.
  * `page`: The [Pupetteer page](https://devdocs.io/puppeteer-page/).

You can use the [Lighthouse documentation](https://web.dev/lighthouse-user-flows) and the [Puppeteer documentation](https://puppeteer.github.io/puppeteer/docs/puppeteer.page.waitforselector) for your scripts.

### Script example

```js
export const name = 'My Project Preprod';

export const viewport = { width: 1350, height: 940 };
export const settings = {
  screenEmulation: {
    mobile: false,
    width: 1350,
    height: 940,
    deviceScaleFactor: 1,
    disabled: false,
  },
  formFactor: 'desktop',
};

export const flow = async ({ info, debug }, lighthouse, page) => {
  info('Start testing flow...');

  const { MY_URL } = process.env;
  debug('URL', MY_URL);

  await lighthouse.startTimespan({ stepName: 'Start' });
  await page.goto(MY_URL);
  await page.waitForNavigation();
  await lighthouse.endTimespan();
};
```

## Use it in your _bitbucket repo_ project

1. Create a new Git repository.
2. Copy-paste the files from the `template` directory of this repository in your new one.
3. Replace `my-project` by you project name in all files.
4. Configurate your environment variables (with keyvaults. Replace or remove the `MY_URL` one for example.

## Use it on your local environment

**Prerequisite**

You'll need [Node.js](https://nodejs.org) **16+ LTS**. A [NVM](https://github.com/nvm-sh/nvm) config is also available.

* This project use the [airbnb coding style](https://github.com/airbnb/javascript).
* Node.js is configured with [type _module_](https://nodejs.org/docs/latest-v13.x/api/esm.html#esm_enabling). We use native imports ([infos](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Modules)).
* Node.js is [cross-plateform](https://nodejs.org/en/about/). The line-ending of all files are in Unix format (`\n`).

**Install**
1. Clone this repository to your local environment.
2. If you want to use NVM, start its command: `nvm use`.
3. Install the dependencies: `npm i`.
4. This project use [DotEnv](https://github.com/motdotla/dotenv). You can create a _git ignored_ `.env` file to set your variables. A base `.env.dist` file is available to easely copy-paste it into `.env`. Variables are described after in this page.
5. Start the `npm run inspect` command.

**Environment variables**
* `WEBINSPECTOR_DEBUG` (default: _false_): Enable the debug logs. Errors are also more described.
* `WEBINSPECTOR_HEADLESS` (default: _true_): The Chromium browser will be started with its [headless mode](https://developers.google.com/web/updates/2017/04/headless-chrome).
* `WEBINSPECTOR_FLOW_CONFIG_PATH` (default: _./config/flow.js_): Absolute or relative path to the user flow script.
* `WEBINSPECTOR_OUTPUT` (default: _./reports_): Absolute or relative path to the reports output directory.

## Contribute

You want to contribute to this project? Nothing more easier.

1. Clone this project on your local environment.
2. Read and use the [commits convention](./.azuredevops/COMMIT_CONVENTION.md).
3. Always update/create tests, **we try to keep the coverage to 100%**, with `npm test`.
4. Fix your linter problems with `npm run lint`.
5. Create a new branch and submit it to the `develop` one.

To create new release, use one of the command based on the [Semver 2.0](https://semver.org) spec:
* `npm run major` to create a new major version.
* `npm run minor` to create a new minor version.
* `npm run patch` to create a new patch version.
