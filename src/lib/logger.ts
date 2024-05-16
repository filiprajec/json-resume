const config = {
  debug: false,
  warn: false,
  error: true,
};

export const logger = {
  debug: (...args) => {
    if (!config.debug) return;
    console.log(...args);
  },
  warn: (...args: (string | undefined)[]) => {
    if (!config.warn) return;
    console.warn(...args);
  },
  error: (...args) => {
    if (!config.error) return;
    console.error(...args);
  },
};
