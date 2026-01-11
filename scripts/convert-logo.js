const sharp = require("sharp");
const fs = require("fs");

async function convertSvgToPng() {
  try {
    const svgBuffer = fs.readFileSync("public/logo.svg");
    await sharp(svgBuffer).resize(512, 512).png().toFile("public/logo.png");
    console.log("Logo converted to PNG successfully");
  } catch (error) {
    console.error("Error converting logo:", error);
  }
}

convertSvgToPng();
