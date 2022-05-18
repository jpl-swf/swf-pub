const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetSize = 600;
const targetMargin = 100;

//changer en fonction de l'emplacement chez l'utilisateur
const basePath = `/Volumes/GoogleDrive/My\ Drive/SWF/fundtruck/Logos\ Partenaires\ FT`;
const sourceFolder = 'NOUVEAUX';
const convertedFolder = targetSize;
const errorFolder = 'NOUVEAUX';
const successFolder = 'MASTER';

const validExt = ['.jpg', '.jpeg', '.png', '.gif'];



const files = fs.readdirSync(`${basePath}/${sourceFolder}`);

for (let i = 0; i < files.length; i++) {
    const image = files[i];
    const imageNum = i + 1;
    const extension = path.extname(image);
    const baseName = path.basename(image, extension);

    console.log({ image, imageNum, extension, baseName });

    const fullSourcePath = `${basePath}/${sourceFolder}/${image}`;
    const fullConvertedPath = `${basePath}/${convertedFolder}/${image}`;
    const fullErrorPath = `${basePath}/${errorFolder}/${image}`;
    const fullSuccessPath = `${basePath}/${successFolder}/${image}`;

    if (!validExt.includes(extension)) {
        fs.rename(fullSourcePath, fullErrorPath, function (err) {
            if (err) throw `${image} - ${err}`;
            console.log(`${imageNum}/${files.length} / ${image} : ${validExt} uniquement, déplacé dans ${errorFolder} `);
        });

        continue;
    } else {
        sharp(fullSourcePath)
            .flatten({ background: '#FFFFFF' })
            .trim()

            .resize(targetSize - targetMargin, targetSize - targetMargin, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 1 },
            })

            .extend({
                top: targetMargin / 2,
                bottom: targetMargin / 2,
                left: targetMargin / 2,
                right: targetMargin / 2,
                background: { r: 255, g: 255, b: 255, alpha: 1 },
            })

            .toFile(`${basePath}/${convertedFolder}/${baseName}-${targetSize}.png`, function (err) {
                if (err) throw `${image} - ${err}`;

                fs.rename(fullSourcePath, fullSuccessPath, function (err) {
                    if (err) throw `${image} - ${err}`;
                    console.log(`${imageNum}/${files.length} / ${image} : déplacé dans ${successFolder} `);
                });
            });
    }
}
