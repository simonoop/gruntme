#!/usr/bin/env node
const { version } = require('./package.json'),
    helper = require('./lib/helper');

console.log(`Grunt me ${version}`);

helper.readGruntFile()
    .then(helper.installModules)
