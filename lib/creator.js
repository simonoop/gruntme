const fs = require('fs');
const src = __dirname + '/data/Gruntfile.js.sample';
const dest = process.env.PWD + '/Gruntfile.js.sample';

module.exports = {
    generateGruntFile: () => {
        return new Promise((resolve, reject) => {
            fs.copyFile(src, dest, (err) => {
                if (!err) {
                    resolve(`I've created a sample gruntfile in ${dest}`);
                } else {
                    reject(err);
                }
            });
        });
    }
};