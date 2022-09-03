import fse from "fs-extra";
import { artworks } from "./public/artworks.mjs";

// 0. Clear out build directory.
fse.removeSync("build");

// 1. Copy the public directory for each artwork in `build/`.
artworks.forEach(async (artwork) => {
  const srcDir = `public`;
  const destDir = `build/${artwork}`;
  console.log(`Making... ${destDir}`);

  try {
    fse.copySync(srcDir, destDir, { overwrite: true });
  } catch (err) {
    console.error(err);
  }

  // 2. Remove all asset directories
  fse.removeSync(destDir + "/assets/stills");
  fse.removeSync(destDir + "/assets/web-videos");

  // 3. Copy back the individual assets needed.
  fse.copySync(
    srcDir + `/assets/stills/${artwork}.webp`,
    destDir + `/assets/stills/${artwork}.webp`
  );

  fse.copySync(
    srcDir + `/assets/web-videos/${artwork}.mp4`,
    destDir + `/assets/web-videos/${artwork}.mp4`
  );

  //  4. Copy the pdf supplied with `artemis` to its build directory.
  if (artwork === "artemis") {
    fse.copySync(
      "original-artwork-files/genetically-modified-gods.pdf",
      destDir + "/genetically-modified-gods.pdf"
    );
  }

  // 5. Update each index.html to refer to the correct piece.
  const indexPath = destDir + "/index.html";
  const data = fse.readFileSync(indexPath, "utf8");
  const result = data.replace(
    `window.artwork = "";`,
    `window.artwork = "${artwork}";`
  );
  fse.writeFileSync(indexPath, result, "utf8");

  // 6. Use a map to the original files for copying over the videos to each build
  // directory if those files are found.
  const artworkFileMap = {
    artemis: "artemis.mp4",
    "designer-baby": "Designer Baby.mov",
    "ff-01": "FF_01.mp4",
    "ff-02": "FF_02.mp4",
    "hollow-ocean": "Hollow Ocean.mp4",
    icosahedron: "ICOSAHEDRON.mp4",
    "les-mutants-1": "LES MUTANTS (1).mov",
    "les-mutants-2": "LES MUTANTS (2).mov",
    "les-mutants-3": "LES MUTANTS (3).mov",
    "lizard-king": "LIZARD KING.mp4",
    "ojo-dont-slip-on-the-ba-nano-peal":
      "Ojo! Don't Slip on the Ba-nano Peal.mov",

    "post-pangea": "Post-Pangea.m4v",
    sanctum: "SANCTUM.mp4",
    "tin-y-pluri": "Tin y Pluri.m4v",
  };

  if (artworkFileMap[artwork]) {
    fse.copySync(
      "original-artwork-files/" + artworkFileMap[artwork],
      destDir + "/" + artworkFileMap[artwork]
    );
  }

});