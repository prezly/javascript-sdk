## Prezly JavaScript SDK

### Getting started

```sh
npm install @prezly/sdk
# or yarn
yarn add @prezly/sdk
```

```js
import PrezlySdk from '@prezly/sdk';

const prezlySdk = new PrezlySdk({
    accessToken: 'your-access-token',
});
```

Or with node (`commonjs`) syntax

```js
const PrezlySdk = require('@prezly/sdk').default;

const prezlySdk = new PrezlySdk({
    accessToken: 'your-access-token',
});
```
