#!/usr/bin/env node
const { version } = require('./package.json'),
    helper = require('./lib/helper'),
    [, , param] = process.argv;

console.log(`Grunt me ${version}`);

if (!['-S', '-D', '--save', '--save-dev'].includes(param)) {
    console.log(`Usage:`);
    console.log('gruntme -S         install to dependencies');
    console.log('gruntme --save     install to dependencies');
    console.log('gruntme -D         install to devDependencies');
    console.log('gruntme --save-dev install to devDependencies');
} else {

    helper.readGruntFile()
        .then(helper.installModules.bind(null, param))
        .then(console.log.bind())
        .catch(console.log.bind(null, `error:`));
}