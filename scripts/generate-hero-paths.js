const opentype = require("opentype.js");
const fs = require("fs");

const FONT_PATH = "./fonts/PlayfairDisplay-Black.ttf";
const LINES = ["Deeksharambh", "2026"];
const FONT_SIZE = 200;
const LINE_GAP = 40;

const buffer = fs.readFileSync(FONT_PATH);
const font = opentype.parse(
  buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength),
);

function r(v) {
  return Math.round(v * 100) / 100;
}

function serializeCommands(commands) {
  return commands
    .map((c) => {
      if (c.type === "M") return `M${r(c.x)} ${r(c.y)}`;
      if (c.type === "L") return `L${r(c.x)} ${r(c.y)}`;
      if (c.type === "C")
        return `C${r(c.x1)} ${r(c.y1)} ${r(c.x2)} ${r(c.y2)} ${r(c.x)} ${r(c.y)}`;
      if (c.type === "Q") return `Q${r(c.x1)} ${r(c.y1)} ${r(c.x)} ${r(c.y)}`;
      if (c.type === "Z") return "Z";
      return "";
    })
    .join("");
}

const widths = LINES.map((line) => {
  const bbox = font.getPath(line, 0, 0, FONT_SIZE).getBoundingBox();
  return bbox.x2 - bbox.x1;
});
const maxWidth = Math.max(...widths);

let cursorY = 0;
const lineData = LINES.map((line, index) => {
  const x = (maxWidth - widths[index]) / 2;
  const path = font.getPath(line, x, cursorY, FONT_SIZE);
  const bbox = path.getBoundingBox();
  cursorY += FONT_SIZE + LINE_GAP;
  return { text: line, d: serializeCommands(path.commands), bbox };
});

const minX = Math.min(...lineData.map((l) => l.bbox.x1));
const minY = Math.min(...lineData.map((l) => l.bbox.y1));
const maxX = Math.max(...lineData.map((l) => l.bbox.x2));
const maxY = Math.max(...lineData.map((l) => l.bbox.y2));

const result = {
  viewBox: `${minX} ${minY} ${maxX - minX} ${maxY - minY}`,
  lines: lineData.map((l) => ({ text: l.text, d: l.d })),
};

fs.writeFileSync("./lib/heroPaths.json", JSON.stringify(result));
console.log("Generated combined hero path data → lib/heroPaths.json");
