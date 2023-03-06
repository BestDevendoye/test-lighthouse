import 'dotenv/config.js';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { startFlow } from 'lighthouse/lighthouse-core/fraggle-rock/api.js';
import {
  noop, job, cond, errorWhen,
} from '../lib/functional.js';
import logger from '../lib/logger.js';

const DEBUG = process.env.WEBINSPECTOR_DEBUG === 'true';
const HEADLESS = process.env.WEBINSPECTOR_HEADLESS !== 'false';
const FLOW_CONFIG_PATH = path.resolve(process.env.WEBINSPECTOR_FLOW_CONFIG_PATH || './config/flow.js');
const OUTPUT = path.resolve(process.env.WEBINSPECTOR_OUTPUT || './reports');

const log = logger('Web Inspector', DEBUG);
const { info, debug } = log;
const reportDate = () => new Date()
  .toISOString()
  .replace(/:/g, '')
  .replace(/\..*?$/, '')
  .replace('T', '_');
const mkdir = (dirPath) => (fs.existsSync(dirPath) ? noop : () => fs.mkdirSync(dirPath))();

let browser;

errorWhen(!fs.existsSync(FLOW_CONFIG_PATH), `The ${FLOW_CONFIG_PATH} doesn't exist`);

job(log, async () => {
  info('Loading configuration...');
  debug('DEBUG:', DEBUG);
  debug('FLOW_CONFIG_PATH:', FLOW_CONFIG_PATH);
  debug('OUTPUT:', OUTPUT);

  const {
    name, settings, viewport, flow,
  } = await import(`file://${FLOW_CONFIG_PATH}`);

  errorWhen(!name, 'The flow script file needs to export a "name" variable');
  errorWhen(!settings, 'You need to export a "settings" variable');
  errorWhen(!viewport, 'You need to export a "viewport" variable');
  errorWhen(!flow, 'You need to export a "flow" variable');

  info(`Start scanning ${name}...`);
  browser = await puppeteer.launch({ headless: HEADLESS });
  const page = await browser.newPage();

  const lighthouse = await startFlow(page, { name, configContext: { settingsOverrides: settings } });

  await page.setViewport(viewport);

  await flow(log, lighthouse, page, browser);

  mkdir(OUTPUT);

  const reportName = `${name} ${reportDate()}`;

  info(`Generating the report ${reportName}`);
  const fileName = `${OUTPUT}/${reportName}`;
  fs.writeFileSync(`${fileName}.html`, await lighthouse.generateReport());
  fs.writeFileSync(`${fileName}.json`, JSON.stringify(await lighthouse.createFlowResult()));
}, async () => {
  await cond(browser, () => browser.close());

  info('[TEST SUCCESSFULLY DONE]');
}, process.env.WEBINSPECTOR_DISABLE_ERRORS === 'true')(DEBUG);
