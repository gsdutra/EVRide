const tsconfigPaths = require('tsconfig-paths');

const baseUrl = './'; // The base directory of your project
const { paths } = require('./tsconfig.json').compilerOptions;

tsconfigPaths.register({
  baseUrl,
  paths
});
