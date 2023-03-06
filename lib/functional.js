export const noop = () => {};
export const always = (val) => () => val;
export const cond = (value, fnIf, fnElse = noop) => (value ? fnIf() : fnElse());
export const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
export const wait = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve(), ms);
});

export const curry = (...argsToCurry) => {
  const fn = argsToCurry.pop();

  return (...args) => fn(...argsToCurry, ...args);
};

export const job = (log, fn, fnFinally = noop, disableThrowError = false) => async (displayErrors) => {
  let inError = false;

  try {
    await fn();
  } catch (err) {
    inError = true;
    log.error(displayErrors ? err.stack : err.message);
  } finally {
    await fnFinally();
  }

  cond(inError && !disableThrowError, () => {
    throw new Error('Job process exited with errors');
  });
};

export const errorWhen = (value, message) => cond(value, () => {
  const err = new Error(message);
  err.isCustom = true;

  throw err;
});
