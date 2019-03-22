import to from './to';

export const retryp = async (func, options) => {
  const { limit, interval } = options;
  let [ error, response ] = await to(func());
  if (error) {
    return new Promise((resolve, reject) => {
      if (limit === 0) {
        return reject('error/retry-limit');
      }
      setTimeout(async () => {
        let [ error, response ] = await to(retryp(func, { ...options, limit: options.limit - 1 }));
        if (error) {
          return reject(error);
        }
        return resolve(response);
      }, interval);
    });
  }
  return response;
};
