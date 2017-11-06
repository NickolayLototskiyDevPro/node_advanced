const OwnGulp = require('own-gulp');
const config = require('./own-gulp-config-bundle-css');

const ownGulp = new OwnGulp(config);

ownGulp.run();