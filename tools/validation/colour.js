/**
 * VISIONARY ART TRANSLATOR: Text to Color Mapping
 * Converts any sentence into HSL color values for art generation
 * Public domain, do what you want
 */

// colour-from-text.js (public-domain)
function textToHSL(text) {
  const sum = [...text].reduce((a,c)=>a+c.charCodeAt(0),0);
  const len = text.length;
  return {h: len % 360, s: 70, l: Math.floor(sum/len/2.55)};
}

// visionary-canvas.js (zero deps)
export function paintSentence(ctx, sentence, x, y, radius){
  const {h,s,l} = textToHSL(sentence);
  ctx.fillStyle = `hsl(${h},${s}%,${l}%)`;
  ctx.beginPath();
  ctx.arc(x,y,radius,0,Math.PI*2);
  ctx.fill();
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { textToHSL, paintSentence };
}