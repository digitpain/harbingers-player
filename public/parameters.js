// ✴️ Parameters
// This is customized for each piece's media and used acrosss other scripts. 
import { artworks } from "./artworks.mjs";

if (window.artwork.length === 0) {
  window.artwork = artworks[Math.floor(Math.random() * artworks.length)];
}

window.params = { name: window.artwork };