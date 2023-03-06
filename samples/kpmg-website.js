export const name = 'KPMG website';

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

export const flow = async ({ info }, lighthouse, page) => {
  info('Start testing flow...');

  info('Home page...');
  await lighthouse.startTimespan({ stepName: 'Home page' });
  await page.goto('https://home.kpmg/fr/fr/home.html', { waitUntil: 'networkidle0' });
  await lighthouse.endTimespan();

  info('Cookie frame...');
  await lighthouse.startTimespan({ stepName: 'Cookie frame' });
  const cookiesButton = await page.waitForSelector('#onetrust-accept-btn-handler');
  await cookiesButton.click();
  await lighthouse.endTimespan();

  const link = await page.waitForSelector('a.homepagebanner-link');

  await lighthouse.startTimespan({ stepName: 'Banner page' });
  await link.click();
  await page.waitForNavigation();
  await lighthouse.endTimespan();

  info('Flow done');
};
