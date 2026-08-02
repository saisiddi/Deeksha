const opentype = require("opentype.js");
const fs = require("fs");

const FONT_PATH = "./fonts/PlayfairDisplay-Black.ttf";
const LINES = ["Deeksharambh", "2026"];
const FONT_SIZE = 200;

const buffer = fs.readFileSync(FONT_PATH);
const font = opentype.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));

const result = LINES.map((line) => {
  const path = font.getPath(line, 0, 0, FONT_SIZE);
  const bbox = path.getBoundingBox();
  return {
    text: line,
    d: path.toPathData(2),
    viewBox: `${bbox.x1} ${bbox.y1} ${bbox.x2 - bbox.x1} ${bbox.y2 - bbox.y1}`,
  };
});

fs.writeFileSync("./lib/heroPaths.json", JSON.stringify(result));
console.log("Generated hero path data → lib/heroPaths.json");
