export const name = 'DISCOVERY website';

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

// import 'dotenv/config.js';
// console.log(process.env.DISCOVERY_URL)
// import puppeteer from 'puppeteer';
// const puppeteer = require('puppeteer');

export const flow = async ({ info, debug }, lighthouse, page) => {
  info('Start testing flow...');

  info('Home page...');
  await lighthouse.startTimespan({ stepName: 'Home page' });

  await page.setDefaultNavigationTimeout(0);
  await page.goto(process.env.DISCOVERY_URL, { waitUntil: 'networkidle2' });
  console.log('site web okay');
  await lighthouse.endTimespan();

  // await page.screenshot({ path: 'discovery.png' });
  // await page.pdf({ path: 'discovery.pdf', format:'A4'})

  // //Se connecter en tant que collaborateur
  info('Login frame...');
  await lighthouse.startTimespan({ stepName: 'login frame' });
  const login = await page.waitForXPath('//form[@id=\'gigya-login-form\']//a[@class=\'gigya-composite-control gigya-composite-control-link collabConnect\']');
  await login.click();
  await page.screenshot({ path: 'login.png' });
  console.log('login ok');
  await lighthouse.endTimespan();

  // /*//Utiliser un autre compte
  // const use_other = await page.waitForXPath(`div[id='otherTile'] div[class='table-cell text-left content']`);

  // await use_other.click();
  // await page.screenshot({ path: 'use_other.png' });
  // console.log('use_other ok');*/
  await lighthouse.startTimespan({ stepName: 'input_login' });
  const input_login = await page.waitForXPath('//input[@id=\'i0116\']');

  await input_login.type(process.env.DISCOVERY_USERNAME, { delay: 100 });
  await page.screenshot({ path: 'input_login.png' });

  await lighthouse.endTimespan();

  await lighthouse.startTimespan({ stepName: 'input_login' });
  const suivant = await page.waitForXPath('//input[@id=\'idSIButton9\']');
  await suivant.click();
  await page.screenshot({ path: 'suiavnt.png' });
  console.log('suivant ok');
  await lighthouse.endTimespan();

  await lighthouse.startTimespan({ stepName: 'password' });
  const password = await page.waitForXPath('//input[@id=\'passwordInput\']');

  await password.type(process.env.DISCOVERY_PASSWORD, { delay: 50 });
  await page.screenshot({ path: 'password.png' });
  console.log('password ok');
  await lighthouse.endTimespan();

  await lighthouse.startTimespan({ stepName: 'connexion' });
  const connexion = await page.waitForXPath('//span[@id=\'submitButton\']');
  await connexion.click();
  await page.screenshot({ path: 'connexion.png' });
  console.log('connexion ok');
  await lighthouse.endTimespan();

  // await browser.close();
};
