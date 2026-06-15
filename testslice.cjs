const Jimp = require('jimp');

async function testSlice(file, outName) {
    const img = await Jimp.read(file);
    const clone = img.clone();
    clone.crop(140 - 120, 220 - 120, 240, 240); // Top left circle
    await clone.writeAsync(`public/products/${outName}.jpg`);
    console.log(`Saved ${outName}`);
}
async function run() {
    await testSlice('C:/Users/D sanjay kumar/.gemini/antigravity/brain/e3bbffda-857c-49b6-bf40-f1cecc58bfcf/.tempmediaStorage/media_e3bbffda-857c-49b6-bf40-f1cecc58bfcf_1780765924010.jpg', 'testA');
    await testSlice('C:/Users/D sanjay kumar/.gemini/antigravity/brain/e3bbffda-857c-49b6-bf40-f1cecc58bfcf/.tempmediaStorage/media_e3bbffda-857c-49b6-bf40-f1cecc58bfcf_1780665994946.jpg', 'testB');
    await testSlice('C:/Users/D sanjay kumar/.gemini/antigravity/brain/e3bbffda-857c-49b6-bf40-f1cecc58bfcf/.tempmediaStorage/media_e3bbffda-857c-49b6-bf40-f1cecc58bfcf_1780810185253.png', 'testC');
}
run();
