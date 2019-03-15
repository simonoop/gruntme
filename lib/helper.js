const regex = /loadNpmTasks\(['"`](.*)['"`]\)/,
    readline = require('readline'),
    npm = require('npm'),
    fs = require('fs');

function readGruntFile() {
    let modules = [];
    return new Promise((resolve, reject) => {
        lineReader = readline.createInterface({
            input: fs.createReadStream('./Gruntfile.js')
        });

        lineReader.on("line", (line) => {
            let found = line.match(regex);
            if (found) {
                modules.push(found[1]);
            }
        });

        lineReader.on("close", () => {
            resolve(modules);
        });
    });
}

function installModules(modules) {
    //https://stackoverflow.com/questions/15957529/can-i-install-a-npm-package-from-javascript-running-in-node-js
    npm.load(function (err) {
        npm.commands.install(modules, function (er, data) {});

        npm.on('log', function (message) {
            console.log(message);
        });
    });
}

module.exports = {
    installModules,
    readGruntFile
}