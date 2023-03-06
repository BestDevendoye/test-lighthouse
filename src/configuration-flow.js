export const name = 'SAPCC website';

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

let DEFAULT_HOME_PAGE;
let DEFAULT_RECHERCHE_PAGE;
let DEFAULT_PRODUIT_PAGE;
let DEFAULT_PANIER_PAGE;
let DEFAULT_HOMME_PAGE;


const getEnvironment = () => {
  const nodeEnv = process.env.NODE_ENV.toUpperCase();
  DEFAULT_HOME_PAGE = process.env[`DEFAULT_HOME_PAGE_${nodeEnv}`];
  DEFAULT_RECHERCHE_PAGE = process.env[`DEFAULT_RECHERCHE_PAGE_${nodeEnv}`];
  DEFAULT_PRODUIT_PAGE = process.env[`DEFAULT_PRODUIT_PAGE_${nodeEnv}`];
  DEFAULT_PANIER_PAGE = process.env[`DEFAULT_PANIER_PAGE_${nodeEnv}`];
  DEFAULT_HOMME_PAGE = process.env[`DEFAULT_HOMME_PAGE_${nodeEnv}`];

};

export const flow = async ({ info }, lighthouse, page) => {
  info('Initialization of environment variables');
  getEnvironment();
  info('Start testing flow...');

  info('navigate to home page');
  await page.setDefaultNavigationTimeout(60);
  await lighthouse.navigate(DEFAULT_HOME_PAGE , {
    stepName: 'HomePage'
});

  info('navigate to recherche page');
  await page.setDefaultNavigationTimeout(60);
  await lighthouse.navigate(DEFAULT_RECHERCHE_PAGE , {
    stepName: 'Page Recherche'
});

  
  info('navigate to produit page');
  await page.setDefaultNavigationTimeout(60);
  await lighthouse.navigate( DEFAULT_PRODUIT_PAGE , {
    stepName: 'Page list produit'
});

  info('navigate to homme page');

  await page.setDefaultNavigationTimeout(60);
  await lighthouse.navigate(DEFAULT_HOMME_PAGE , {
    stepName: 'Page categorie Homme'
});

  info('navigate to panier  page');

  await page.setDefaultNavigationTimeout(60);
  await lighthouse.navigate(DEFAULT_PANIER_PAGE , {
    stepName: 'Page Panier'
});

  /*
  await lighthouse.startTimespan({ stepName: 'navigate to home page' });
  await page.goto(DEFAULT_HOME_PAGE);
  await lighthouse.endTimespan();
  info('navigate to recherche page');
  await lighthouse.startTimespan({ stepName: 'navigate to recherche page' });
  await page.goto(DEFAULT_RECHERCHE_PAGE);
  await lighthouse.endTimespan();

  info('navigate to produit page');
  await lighthouse.startTimespan({ stepName: 'navigate to produit page' });
  await page.goto(DEFAULT_PRODUIT_PAGE);
  await lighthouse.endTimespan();

  info('navigate to homme page');
  await lighthouse.startTimespan({ stepName: 'navigate to homme page' });
  await page.goto(DEFAULT_HOMME_PAGE);
  await lighthouse.endTimespan();


  info('navigate to panier  page');
  await lighthouse.startTimespan({ stepName: 'navigate to panier page' });
  await page.goto(DEFAULT_PANIER_PAGE);
  await lighthouse.endTimespan();


  info('LOGIN TO THE WEB APP TO ADD PRODUCTS TO THE SHOPPING CART');

  info('login to the web app by providing a valid username and password');
  await lighthouse.startTimespan({ stepName: 'login to the web app by providing a valid username and password' });
  const loginPageLink = await page.waitForSelector('.icon-account');
  await loginPageLink.click();
  const linkButtonLink = await page.waitForSelector('.link-btn');
  await linkButtonLink.click();

  info('set value to the input username field form');
  const usernameFormInput = await page.waitForSelector('#username');
  await usernameFormInput.type(process.env.LOGIN_PAGE_USERNAME, { delay: 100 });

  info('set value to the input password field form');
  const passwordFormInput = await page.waitForSelector('#password');
  await passwordFormInput.type(process.env.LOGIN_PAGE_PASSWORD, { delay: 100 });

  info('click to the submit button after providing username and password value');
  const submitLoginButton = await page.waitForSelector('#submitLogin');
  await submitLoginButton.click();

  info('click on the nouveautes link page');
  const nouveauteLink = await page.waitForXPath('//*[@id="app"]/div[2]/header/div/div[2]/div/div/ul/li[4]');
  await nouveauteLink.click();

  info('click on the nouveautes homme link page');
  const nouveauteHommeLink = await page.waitForXPath('//*[@id="app"]/section/section/div[2]/div/a[2]');
  await nouveauteHommeLink.click();

  info('click on one of the displayed products');
  const selectOneProductLink = await page.waitForXPath('//*[@id="86799901-119"]/article/section[2]/div[1]/section');
  await selectOneProductLink.click();

  info('click on the drop-down menu to select a size for the selected product');
  const sizeBlockLink = await page.waitForSelector('#size-block');
  await sizeBlockLink.click();

  info('click to select one size on the drop-down menu for the selected product');
  const selectLProductSizeLink = await page.waitForXPath('//*[@id="size-block"]/option[5]');
  await selectLProductSizeLink.click();

  info('click to add the selected product to the shopping cart');
  // eslint-disable-next-line max-len
  const addProductToShoppingCartLink = await page.waitForXPath('/html/body/div[2]/div/div/section/section[3]/section/section[2]/section[1]/div[5]/div[1]/button');
  await addProductToShoppingCartLink.click();

  await lighthouse.endTimespan();
*/
  info('flow successfully run');

};
