const Tesseract = require('tesseract.js');
async function run() {
    const files = [
        'C:/Users/D sanjay kumar/.gemini/antigravity/brain/e3bbffda-857c-49b6-bf40-f1cecc58bfcf/.tempmediaStorage/media_e3bbffda-857c-49b6-bf40-f1cecc58bfcf_1780765924010.jpg',
        'C:/Users/D sanjay kumar/.gemini/antigravity/brain/e3bbffda-857c-49b6-bf40-f1cecc58bfcf/.tempmediaStorage/media_e3bbffda-857c-49b6-bf40-f1cecc58bfcf_1780665994946.jpg',
        'C:/Users/D sanjay kumar/.gemini/antigravity/brain/e3bbffda-857c-49b6-bf40-f1cecc58bfcf/.tempmediaStorage/media_e3bbffda-857c-49b6-bf40-f1cecc58bfcf_1780810185253.png'
    ];
    for (const f of files) {
        try {
            const { data: { text } } = await Tesseract.recognize(f, 'eng');
            console.log(`\n=== ${f} ===\n${text.substring(0, 200)}`);
        } catch (e) {}
    }
}
run();
