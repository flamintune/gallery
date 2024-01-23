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

  const imageFiles = files
    .filter(file => /\.(jpe?g|png|gif)$/i.test(file)) // Filter for image files
    .map(file => `'/src/assets/${file}'`) // Wrap in quotes
    .join(' | '); // Join into a TypeScript union type

  const typeString = `export type ImagePath = ${imageFiles};\n`;
  const enumImageFiles = files.filter(file => /\.(jpe?g|png|gif)$/i.test(file)) // Filter for image files
    .map(file => `'/src/assets/${file}'`) // Wrap in quotes
    .join(',\n'); // Join into a TypeScript union type
  const enumString = `export enum ImageEnum {${enumImageFiles}
  }`
  // Write the type to a file
  fs.writeFile(outputPath, typeString+enumString, (err) => {
    if (err) {
      console.error('Error writing the imagePaths.ts file', err);
    } else {
      console.log('ImagePath type generated successfully!');
    }
  });
});