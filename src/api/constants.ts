// When using `import`, TS complains because `package.json` is outside the
// `rootDir`, but it works with `require`.
const { version: packageVersion, repository } = require('../../package.json'); // eslint-disable-line @typescript-eslint/no-var-requires

export const DEFAULT_USER_AGENT = `prezly-javascript-sdk/${packageVersion} (+${repository.url})`;
