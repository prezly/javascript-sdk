## Prezly JavaScript SDK

### Getting started

```sh
npm install --save @prezly/sdk
# or yarn
yarn add @prezly/sdk
```

### Using the code

Using ES Modules:

```js
import PrezlySdk from '@prezly/sdk';

const prezlySdk = new PrezlySdk({
    accessToken: 'your-access-token',
});
```

Or Using CommonJS:

```js
const PrezlySdk = require('@prezly/sdk').default;

const prezlySdk = new PrezlySdk({
    accessToken: 'your-access-token',
});
```

## Requirements

### API token

At this moment, the UI does not support issuing API tokens. Please contact support to issue one for you.

### [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API support

`@prezly/sdk` is using `fetch` to create requests. We assume that the environment running the code supports it.

We understand that some of the environments, such as node.js or old browsers, do not support `fetch`. This can be resolved by including a polyfill.

#### Polyfilling in browsers using [`whatwg-fetch`](https://www.npmjs.com/package/whatwg-fetch)

```sh
npm install --save whatwg-fetch
# or yarn
yarn add whatwg-fetch
```

```js
import 'whatwg-fetch';
// ...
import PrezlySdk from '@prezly/sdk';
```

We recommend referring to the [official `whatwg-fetch` module documentation](https://www.npmjs.com/package/whatwg-fetch) for more information.

#### Polyfilling in browsers using [`node-fetch`](https://www.npmjs.com/package/node-fetch)

```sh
npm install --save node-fetch
# or yarn
yarn add node-fetch
```

```js
global.fetch = require('node-fetch');
// ...
const PrezlySdk = require('@prezly/sdk').default;
```

We recommend referring to the [official `node-fetch` module documentation](https://www.npmjs.com/package/node-fetch) for more information.

#### Platform-agnostic polyfill using [`cross-fetch`](https://www.npmjs.com/package/cross-fetch)

```sh
npm install --save cross-fetch
# or yarn
yarn add cross-fetch
```

Using ES Modules:

```js
import 'cross-fetch/polyfill';
// ...
import PrezlySdk from '@prezly/sdk';
```

Or Using CommonJS:

```js
require('cross-fetch/polyfill');
// ...
const PrezlySdk = require('@prezly/sdk').default;
```

We recommend referring to the [official `cross-fetch` module documentation](https://www.npmjs.com/package/cross-fetch) for more information.

