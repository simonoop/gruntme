const regex = /loadNpmTasks\(['"`](.*)['"`]\)/,
    Spinner = require('cli-spinner').Spinner,
    exec = require('child_process').exec,
    readline = require('readline'),
    fs = require('fs');

function readGruntFile() {
    let modules = [];
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(process.env.PWD + '/Gruntfile.js')) {
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

function installModule(param, total, counter, module) {
    return new Promise((resolve, reject) => {
        const message = `installing #${counter}/${total} ${module}...`;
        const spinner = new Spinner(`${message} %s`);
        spinner.start();
        exec(`npm install ${param} ${module}`, (error, stdout, stderr) => {
            spinner.stop(true);
            if (error) {
                reject(`${error}`);
                return;
            }
            console.log(`${message} done.`);
            resolve();
        });
    });
}

function installModules(param, modules) {
    return new Promise((resolve, reject) => {

        if (modules.length === 0) {
            reject('No modules found');
            return;
        }

        let counter = 0;
        let chain = modules.reduce((p, module) => {
            return p.then(() => installModule(param, modules.length, ++counter, module));
        }, Promise.resolve());

        chain.then(()=>{
            resolve('finished.');
        });
    });
}

module.exports = {
    installModules,
    readGruntFile
};