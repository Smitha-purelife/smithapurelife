const Jimp = require('jimp');
async function checkColor() {
    const img = await Jimp.read('public/products/concerns_diagram.jpg');
    const hex = img.getPixelColor(0, 0);
    const rgba = Jimp.intToRGBA(hex);
    console.log(`Top-left pixel color: R=${rgba.r}, G=${rgba.g}, B=${rgba.b}`);
}
checkColor();
