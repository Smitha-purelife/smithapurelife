const Jimp = require('jimp');
const fs = require('fs');

async function processImage(inFile, outFile) {
    try {
        const image = await Jimp.read('public/products/' + inFile);
        const wide = new Jimp(2560, 1024);
        
        // We want to draw the image on the right
        wide.composite(image, 2560 - 1024, 0);
        
        // Sample the left edge of the original image and stretch it across the left side
        for (let y = 0; y < 1024; y++) {
            const color = image.getPixelColor(0, y);
            for (let x = 0; x < (2560 - 1024); x++) {
                wide.setPixelColor(color, x, y);
            }
        }
        
        // Add a smooth fade mask? Actually, just stretching the pixel might look like lines.
        // Let's stretch the first 100 pixels to create a gradient-like blur instead of a single pixel line.
        // For simplicity, let's blur the left stretched part heavily.
        // Better: We copy a 10px strip from x=0, resize it to 1536x1024, and paste it.
        const strip = image.clone().crop(0, 0, 10, 1024).resize(2560 - 1024, 1024);
        wide.composite(strip, 0, 0);
        
        // Save
        await wide.writeAsync('public/products/' + outFile);
        console.log('Successfully made wide:', outFile);
    } catch (e) {
        console.error('Error with', inFile, e);
    }
}

async function main() {
    await processImage('herbal_wash_hero_padding.png', 'herbal_wash_hero_wide_final.png');
    await processImage('pro_repair_serum_hero_padding.png', 'pro_repair_serum_hero_wide_final.png');
    await processImage('follicra_hero_padding.png', 'follicra_hero_wide_final.png');
}

main();
