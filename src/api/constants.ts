const version = process.env.npm_package_version;
const url = process.env.npm_package_repository_url;

export const DEFAULT_USER_AGENT = `prezly-javascript-sdk/${version} (+${url})`;
