const Jimp = require('jimp');

async function findCircles() {
    const img = await Jimp.read('C:/Users/D sanjay kumar/.gemini/antigravity/brain/e3bbffda-857c-49b6-bf40-f1cecc58bfcf/media__1780836018316.png');
    const width = img.getWidth();
    const height = img.getHeight();
    
    // Scan horizontally at y=170
    const isNonWhite = (x, y) => {
        const hex = img.getPixelColor(x, y);
        const rgba = Jimp.intToRGBA(hex);
        return rgba.r < 240 || rgba.g < 240 || rgba.b < 240;
    };
    
    let nonWhitePixels = [];
    for (let x = 0; x < width; x++) {
        if (isNonWhite(x, 170)) nonWhitePixels.push(x);
    }
    
    let groups = [];
    let currentGroup = [];
    for (let i = 0; i < nonWhitePixels.length; i++) {
        if (currentGroup.length === 0) {
            currentGroup.push(nonWhitePixels[i]);
        } else {
            if (nonWhitePixels[i] === nonWhitePixels[i-1] + 1) {
                currentGroup.push(nonWhitePixels[i]);
            } else {
                groups.push(currentGroup);
                currentGroup = [nonWhitePixels[i]];
            }
        }
    }
    if (currentGroup.length > 0) groups.push(currentGroup);
    
    console.log("Top row objects X coords at Y=170:");
    groups.forEach((g, i) => {
        if (g.length > 20) {
            console.log(`Circle ${i+1}: X from ${g[0]} to ${g[g.length-1]} (Center: ${Math.round((g[0]+g[g.length-1])/2)}, Diameter: ${g.length})`);
        }
    });

    // Scan vertically at x = Center of first circle
    let firstCenter = groups[0] ? Math.round((groups[0][0]+groups[0][groups[0].length-1])/2) : 130;
    let yGroups = [];
    currentGroup = [];
    for (let y = 0; y < height; y++) {
        if (isNonWhite(firstCenter, y)) {
            if (currentGroup.length === 0) {
                currentGroup.push(y);
            } else {
                if (y === currentGroup[currentGroup.length-1] + 1) {
                    currentGroup.push(y);
                } else {
                    yGroups.push(currentGroup);
                    currentGroup = [y];
                }
            }
        }
    }
    if (currentGroup.length > 0) yGroups.push(currentGroup);
    
    console.log("\nFirst column objects Y coords:");
    yGroups.forEach((g, i) => {
        if (g.length > 10) {
            console.log(`Object ${i+1}: Y from ${g[0]} to ${g[g.length-1]} (Center: ${Math.round((g[0]+g[g.length-1])/2)}, Length: ${g.length})`);
        }
    });
}
findCircles();
