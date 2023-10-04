const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourcePath = 'convertir';
const convertedPath = 'convertis';
const errorPath = 'refaire';
const successPath = 'fait';

const validExt = ['.jpg', '.jpeg', '.png', '.gif'];

const targetSize = 600;
const targetMargin = 100;

const files = fs.readdirSync(sourcePath);

for (let i = 0; i < files.length; i++) {
    const image = files[i];
    const imageNum = i + 1;
    const extension = path.extname(image);
    const baseName = path.basename(image, extension);

    console.log({ image, imageNum, extension, baseName });

    const fullSourcePath = `${sourcePath}/${image}`;
    const fullConvertedPath = `${convertedPath}/${image}`;
    const fullErrorPath = `${errorPath}/${image}`;
    const fullSuccessPath = `${successPath}/${image}`;

    if (!validExt.includes(extension)) {
        fs.rename(fullSourcePath, fullErrorPath, function (err) {
            if (err) throw err;
            console.log(`${imageNum}/${files.length} / ${image} : ${validExt} uniquement, déplacé dans ${errorPath} `);
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
                top: targetMargin / 4,
                bottom: targetMargin / 4,
                left: targetMargin / 4,
                right: targetMargin / 4,
                background: { r: 255, g: 255, b: 255, alpha: 1 },
            })

            .toFile(`${convertedPath}/${baseName}.png`, function (err) {
                if (err) throw err;

                fs.rename(fullSourcePath, fullSuccessPath, function (err) {
                    if (err) throw err;
                    console.log(`${imageNum}/${files.length} / ${image} : déplacé dans ${successPath} `);
                });
            });
    }
}
