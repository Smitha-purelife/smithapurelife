const Jimp = require('jimp');
async function run() {
    const img = await Jimp.read('C:/Users/D sanjay kumar/.gemini/antigravity/brain/e3bbffda-857c-49b6-bf40-f1cecc58bfcf/media__1780836018316.png');
    console.log(`Dimensions: ${img.getWidth()} x ${img.getHeight()}`);
}
run();
