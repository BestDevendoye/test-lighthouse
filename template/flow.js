export const name = 'Pulse Recette';

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

// eslint-disable-next-line no-unused-vars
export const flow = async ({ info }, lighthouse, page) => {
  const { MY_URL } = process.env;

  info('Start testing flow on', MY_URL);
};
