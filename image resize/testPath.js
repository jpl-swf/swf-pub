const fs = require('fs');
const path = require('path');

const basePath = `/Volumes/GoogleDrive/My\ Drive/SWF/fundtruck/Logos\ Partenaires\ FT`;
const folder = `MASTERTEST`;
const fullPath = `${basePath}/${folder}`;

console.log(fullPath);
const files = fs.readdirSync(fullPath);

for (let i = 0; i < files.length; i++) {

    console.log(files[i]);

}