const regex = /loadNpmTasks\(['"`](.*)['"`]\)/,
    exec = require('child_process').exec,
    readline = require('readline'),
    fs = require('fs');

function readGruntFile() {
    let modules = [];
    return new Promise((resolve, reject) => {
        if (fs.exists('./Gruntfile.js')) {
            reject('Gruntfile.js not found. Go get me a Gruntfile.js');
            return;
        }

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
    console.log(`# Installing module ${modules.join(', ')}`);
    console.log('#');
    modules.forEach(module => {
        exec(`npm install --save-dev ${module}`).stderr.pipe(process.stderr);        
    });
}

module.exports = {
    installModules,
    readGruntFile
}