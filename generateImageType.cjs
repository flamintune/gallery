const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'src/assets');
const outputPath = path.join(__dirname, 'src/types/imagePaths.ts');
// Read the directory contents
fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error('Error reading the images directory', err);
    return;
  }
  const filterFiles = files
    .filter(file => /\.(jpe?g|png|gif)$/i.test(file))
  const imageFiles = files
    .filter(file => /\.(jpe?g|png|gif)$/i.test(file)) // Filter for image files
    .map(file => `'/src/assets/${file}'`) // Wrap in quotes
    .join(' | '); // Join into a TypeScript union type

  const typeString = `export type ImagePath = ${imageFiles};\n`;
  const enumImageFiles = filterFiles // Filter for image files
    .map(file => `'/src/assets/${file}'`) // Wrap in quotes
    .join(',\n'); // Join into a TypeScript union type
  const enumString = `export enum ImageEnum {${enumImageFiles}
  }\n`
  const importImages = filterFiles
    .map((file, idx) => `import p${idx} from "/src/assets/${file}"`)
    .join('\n')
  const exportImages = `\nconst pictures = [${filterFiles.map((_, idx) => 'p' + idx).join(',')}]\n
  export {pictures}`
  // Write the type to a file
  fs.writeFile(outputPath, typeString + enumString + importImages + exportImages, (err) => {
    if (err) {
      console.error('Error writing the imagePaths.ts file', err);
    } else {
      console.log('ImagePath type generated successfully!');
    }
  });
});