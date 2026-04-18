const fs = require('fs');
const content = fs.readFileSync('js/games.js', 'utf8');

const updated = content.replace(/(name:\s*"([^"]+)",[\s\S]*?)url:/g, (match, p1, p2) => {
    const encoded = encodeURIComponent(p2 + " game thumbnail");
    const thumb = 'https://tse2.mm.bing.net/th?q=' + encoded + '&w=320&h=200&c=7';
    return p1 + 'thumb: "' + thumb + '", url:';
});

fs.writeFileSync('js/games.js', updated, 'utf8');
console.log('done');
