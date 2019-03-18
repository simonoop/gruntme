#!/usr/bin/env node
const { version } = require('./package.json'),
    helper = require('./lib/helper');

console.log(`Grunt me ${version}`);
console.log('This will npm i the modules you are loading in the Gruntfile.')

helper.readGruntFile()
    .then(helper.installModules)
    .catch((err)=>{
        console.log(`# Error:${err}`);
    });
