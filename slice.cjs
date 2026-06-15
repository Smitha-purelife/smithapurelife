const Jimp = require('jimp');

async function slice() {
    const img = await Jimp.read('C:/Users/D sanjay kumar/.gemini/antigravity/brain/e3bbffda-857c-49b6-bf40-f1cecc58bfcf/media__1780836018316.png');
    
    // Centers of the circles
    const R = 110; // 220 diameter
    const topY = 190;
    const bottomY = 515;
    
    const centers = [
        {x: 128, y: topY}, {x: 384, y: topY}, {x: 640, y: topY}, {x: 896, y: topY},
        {x: 256, y: bottomY}, {x: 512, y: bottomY}, {x: 768, y: bottomY}
    ];
    
    for (let i = 0; i < centers.length; i++) {
        let x = centers[i].x - R;
        let y = centers[i].y - R;
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        
        const clone = img.clone();
        clone.crop(x, y, R*2, R*2);
        await clone.writeAsync(`public/products/concern_${i+1}.jpg`);
        console.log(`Saved concern_${i+1}.jpg`);
    }
}
slice();
