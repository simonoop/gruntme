#!/usr/bin/env node
const { version } = require('./package.json'),
    parser = require('./lib/parser'),
    creator = require('./lib/creator'),
    [, , param] = process.argv;

console.log(`Grunt me ${version}`);

if (['-g'].includes(param)) {
    creator.generateGruntFile()
        .then(console.log)
} else if (['-S', '-D', '--save', '--save-dev'].includes(param)) {
    parser.readGruntFile()
        .then(parser.installModules.bind(null, param))
        .then(console.log.bind())
        .catch(console.log.bind(null, `error:`));
} else {
    console.log(`Usage:`);
    console.log('gruntme            show these instructions');
    console.log('gruntme -S         install to dependencies');
    console.log('gruntme --save     install to dependencies');
    console.log('gruntme -D         install to devDependencies');
    console.log('gruntme --save-dev install to devDependencies');
    console.log('gruntme -g         generate a Gruntfile.js.sample file');
}