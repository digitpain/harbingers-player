// ✴️ Parameters
// This is customized for each piece's media and used acrosss other scripts. 

if (window.artwork.length === 0) {
  const artworks = [
    "artemis",
    "designer-baby",
    "ff-01",
    "ff-02",
    "hollow-ocean",
    "icosahedron",
    "les-mutants-1",
    "les-mutants-2",
    "les-mutants-3",
    "lizard-king",
    "ojo-dont-slip-on-the-ba-nano-peal",
    "post-pangea",
    "sanctum",
    "tin-y-pluri"
  ]

  window.artwork = artworks[Math.floor(Math.random() * artworks.length)];
}

const params = { name: window.artwork };