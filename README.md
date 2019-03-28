# retryp

Provide a function to retry promise if encountering an error, and return promise.

## Installation

`$ npm install retryp` or  `$ yarn add retryp` 

## Usage

### retryp(function, options)

The `function` is a promise, and it will be retried based of options provide if some error occurs.

The `options` argument is an object.
  - `limit`: The maximum amount of times to retry the operation. Default is `10`.
  - `interval`: The number of milliseconds between two retries. Default is `1000`. 

## Example
```js
import retryp from 'retryp';
// var retryp = require('retryp').default;

// Simple example

const doSomethingAsync = async () => {
  // ...
};

try {
  await retryp(doSomethingAsync, options = { limit: 100, interval: 1000 });
} catch (err) {
  console.log(err);
}

```
