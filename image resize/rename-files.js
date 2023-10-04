const fs = require('fs');
const path = require('path');

const codesRaw = fs.readFileSync('code-convert.json',);
const codesObject = JSON.parse(codesRaw);

const sourcePath = 'MASTER21';
const destPath = 'renamed';

const files = fs.readdirSync(sourcePath);
let undefinedList = '';

console.log(files);

for (let i = 0; i < files.length; i++) {
    const extName = path.extname(files[i]);
    const fileName = path.basename(files[i], extName);

    const newFileName = codesObject[fileName];

    if (newFileName == undefined) {
        undefinedList += `${fileName}
        `
    } else {

        fs.renameSync(`${sourcePath}/${fileName}${extName}`, `${destPath}/${newFileName}${extName}`);

    }

    console.log(newFileName, extName);
}

console.log(undefinedList);

fs.writeFileSync('undefinedList.txt', undefinedList);