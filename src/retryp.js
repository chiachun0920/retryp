import to from './to';
import EfficientTimeout from 'efficient-timeout';

let et = new EfficientTimeout();

const defaultOptions = {
  limit: 10,
  interval: 1000
};

const retryp = async (func, options = defaultOptions) => {
  const { limit, interval } = options;
  let [ error, response ] = await to(func());
  if (error) {
    return new Promise((resolve, reject) => {
      if (limit === 0) {
        return reject('error/retry-limit');
      }
      et.setTimeout(async () => {
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

export default retryp;
