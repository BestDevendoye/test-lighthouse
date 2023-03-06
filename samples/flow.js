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

export const flow = async ({ info }, lighthouse, page) => {
  info('Start testing flow...');

  info('Home page...  ');
  await lighthouse.startTimespan({ stepName: 'Home page' });

  await page.setDefaultNavigationTimeout(0);
  await page.goto(process.env.DISCOVERY_URL, { waitUntil: 'networkidle2' });
  info('site web okay');
  await lighthouse.endTimespan();

  // //Se connecter en tant que collaborateur
  info('Login frame...');
  await lighthouse.startTimespan({ stepName: 'login frame' });
  const login = await page.waitForXPath([
    '//form[@id=\'gigya-login-form\']',
    '//a[@class=\'gigya-composite-control gigya-composite-control-link collabConnect\']',
  ].join(''));
  await login.click();

  await lighthouse.endTimespan();

  // remplir la case de l'email
  info('saisir l\'adresse email...');
  await lighthouse.startTimespan({ stepName: 'saisir l\'adresse email' });
  await page.setDefaultNavigationTimeout(0);
  const email = await page.waitForXPath('//*[@id="i0116"]');
  await email.type(process.env.DISCOVERY_USERNAME, { delay: 100 });
  await lighthouse.endTimespan();

  // cliquer sur le bouton suivant
  info('suivant...');
  await lighthouse.startTimespan({ stepName: 'suivant' });
  await page.setDefaultNavigationTimeout(0);
  const suivant = await page.waitForXPath('//*[@id="idSIButton9"]');
  await suivant.click();
  console.log('suivant ok');
  await lighthouse.endTimespan();

  // remplir la case du mot de passe
  info('password...');
  await lighthouse.startTimespan({ stepName: 'password' });
  await page.setDefaultNavigationTimeout(0);
  const password = await page.waitForXPath('//*[@id="passwordInput"]');
  await password.type(process.env.DISCOVERY_PASSWORD, { delay: 50 });
  console.log('password ok');
  await lighthouse.endTimespan();

  // cliquer sur le bouton connexion
  info('connexion...');
  await lighthouse.startTimespan({ stepName: 'connexion' });
  await page.setDefaultNavigationTimeout(0);
  const connexion = await page.waitForXPath('//*[@id="submitButton"]');
  await connexion.click();
  await lighthouse.endTimespan();

  // Dynamic_Reports
  info('Dynamic_Reports...');
  await lighthouse.startTimespan({ stepName: 'Dynamic_Reports' });
  const Dynamic_Reports = await page.waitForXPath('/html/body/div[1]/div[1]/div/div[1]/div[2]/div/div[7]');
  await Dynamic_Reports.click();
  await lighthouse.endTimespan();

  // Initier_demande
  info('Initier_demande...');
  await lighthouse.startTimespan({ stepName: 'Initier_demande' });
  const Initier_demande = await page.waitForXPath('/html/body/div[1]/div[1]/div/div[1]/div[2]/div/div[1]/button');
  await Initier_demande.click();
  await lighthouse.endTimespan();

  // A partir d'un engagement existant
  info('A partir d\'un engagement existant...');
  await lighthouse.startTimespan({ stepName: 'A partir d\'un engagement existant' });
  const engagement_existant = await page.waitForXPath('//*[@id="app"]/div/div[2]/div[2]/div[2]/div[1]/div/div/div[2]/button[1]');
  await engagement_existant.click();
  await lighthouse.endTimespan();
  // étape1
  // saisir un code engagement
  info('saisir un code engagement...');
  await lighthouse.startTimespan({ stepName: 'saisir un code engagement' });
  const code_engagement = await page.waitForXPath('//*[@id="input-386"]');
  await code_engagement.type('2507199400');
  await lighthouse.endTimespan();

  // séléctionner le code en question
  info('séléctionner le code en question...');
  await lighthouse.startTimespan({ stepName: 'séléctionner le code en question' });
  const selectionner_code = await page.waitForXPath('//*[@id="list-item-412-0"]/div');
  await selectionner_code.click();
  await lighthouse.endTimespan();

  // modifier le nom de la demmande
  info('modifier le nom de la demmande...');
  const nom_demande = await page.waitForXPath('//*[@id="input-394"]');
  await nom_demande.type('Test-kyengui_5');

  // Passer à l'étape suivante
  info('Passer à l\'étape suivante...');
  await lighthouse.startTimespan({ stepName: 'Passer à l\'étape suivante ' });
  const etape_suivante = await page.waitForXPath('//*[@id="app"]/div/div[2]/div[3]/div/button');
  await etape_suivante.click();
  await lighthouse.endTimespan();

  // étape 2
  // Ajouter contact
  info('Ajouter contact...');
  await lighthouse.startTimespan({ stepName: 'Ajouter contact ' });
  const Ajouter_contact = await page.waitForXPath('//*[@id="app"]/div/div[2]/div[2]/div[2]/div[2]/div/div/div[4]/div/button');
  await Ajouter_contact.click();
  await lighthouse.endTimespan();

  // rechercher contact
  info('rechercher contact...');
  await lighthouse.startTimespan({ stepName: 'rechercher contact ' });
  const rechercher_contact = await page.waitForXPath('//*[@id="input-59"]');
  await rechercher_contact.type('asliti@kpmg.fr');
  await lighthouse.endTimespan();

  // choisir le contact en question
  info('choisir le contact en question...');
  await lighthouse.startTimespan({ stepName: 'choisir le contact en question ' });
  const choisir_contact = await page.waitForXPath('/html/body/div[1]/div[1]/div/div[2]/div[1]/div[15]/div/div/div');
  await choisir_contact.click();
  await lighthouse.endTimespan();

  // enregistrer
  info('enregistrer...');
  await lighthouse.startTimespan({ stepName: 'enregistrer ' });
  const enregistrer = await page.waitForXPath('//*[@id="app"]/div[4]/div/div/div[3]/button[2]');
  await enregistrer.click();
  await lighthouse.endTimespan();

  // Passer à l'étape suivante
  info('Passer à l\'étape suivante...');
  await lighthouse.startTimespan({ stepName: 'Passer à l\'étape suivante ' });
  const étape_suivante = await page.waitForXPath('//*[@id="app"]/div/div[2]/div[3]/div/button');
  await étape_suivante.click();
  await lighthouse.endTimespan();
  // étape3
  // Ajouter contact
  /* info(`Ajouter contact...`);
      await lighthouse.startTimespan({ stepName: `Ajouter contact `});
      const Ajouter_contact  = await page.waitForXPath(`//*[@id="app"]/div/div[2]/div[2]/div[2]/div[3]/div/div/div[6]/div/div[1]/div[1]/button[2]`);
      await Ajouter_contact.click()
      await lighthouse.endTimespan();
      //Ajouter contact
      info(`remplir Titre...`);
      await lighthouse.startTimespan({ stepName: `remplir Titre `});
      const remplir_Titre  = await page.waitForXPath(`//*[@id="input-100"]`);
      await remplir_Titre.type('ingénieur Devops')
      await lighthouse.endTimespan();

    info(`remplir Titre...`);
      await lighthouse.startTimespan({ stepName: `remplir Titre `});
      const remplir_Titre  = await page.waitForXPath(`//*[@id="input-100"]`);
      await remplir_Titre.type('ingénieur Devops')
      await lighthouse.endTimespan(); */
};
