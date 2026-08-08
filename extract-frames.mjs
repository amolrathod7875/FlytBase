#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import ffmpegStatic from "ffmpeg-static";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const videoPath = path.join(__dirname, "src/assets/Industrial_Video.mp4");
const outputDir = path.join(__dirname, "src/assets/frames");

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log("🎬 Extracting frames from Industrial_Video.mp4...");
console.log(`📁 Output directory: ${outputDir}`);

// Use ffmpeg to extract frames at 10 fps
const ffmpeg = spawn(ffmpegStatic, [
  "-i",
  videoPath,
  "-vf",
  "fps=10",
  path.join(outputDir, "frame_%04d.png"),
]);

ffmpeg.stdout.on("data", (data) => {
  process.stdout.write(data);
});

ffmpeg.stderr.on("data", (data) => {
  process.stderr.write(data);
});

ffmpeg.on("close", (code) => {
  if (code === 0) {
    // Get list of extracted frames
    const files = fs
      .readdirSync(outputDir)
      .filter((f) => f.startsWith("frame_") && f.endsWith(".png"))
      .sort();

    console.log(`\n✅ Successfully extracted ${files.length} frames!`);
    console.log(`📸 Frames saved to: ${outputDir}`);

    // Create a manifest file
    const manifest = {
      total: files.length,
      frames: files.map((f) => `/src/assets/frames/${f}`),
    };

    fs.writeFileSync(
      path.join(outputDir, "manifest.json"),
      JSON.stringify(manifest, null, 2)
    );
    console.log("📋 Manifest created!");
  } else {
    console.error(`❌ ffmpeg exited with code ${code}`);
    console.error(
      "Make sure ffmpeg is installed on your system: https://ffmpeg.org/download.html"
    );
  }
});
