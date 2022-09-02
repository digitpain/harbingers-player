***Harbingers Player***

⚙️ TODO
- [] Incorporate all the videos from the exhibition. 
  - [x] Transcribe each video and add to the repo.
  - [] Generate a still for each video.
- [x] Add scrubbable progress bar.
- [x] Add pause functionality.
  - [x] See if the shader can be paused.
  - [x] Add a transparent play button while paused.
  - [x] Pause and play
- [x] Fix vertical centering issue on https://feralfile2.dev.bitmark.com/artworks/baby-video-xk5.
- [x] Fix zooming video issue.
- [x] Add to a repo and hook up to netlify.

📓 NOTES
Using ffmpeg to extract the first frame of each video as a still:
- `ffmpeg -i input.mp4 -vf "select=eq(n\,0)" output.webp`

Using ffmpeg to transcode a video into an mp4 container.
- `ffmpeg -i designer-baby.mov -crf 18 designer-baby.mp4`

⚠️ TEST: https://feralfile2.dev.bitmark.com/artworks/jeffrey-u6u?fromExhibition=jeffrey-multi-unique-0c7

- [x] artemis.mp4 (not transcoded)
- [x]'Designer Baby.mov' -> designer-baby.mp4
- [x] FF_01.mp4 -> ff-01.mp4
- [x] FF_02.mp4 -> ff-02.mp4
- [x]'Hollow Ocean.mp4' -> hollow-ocean.mp4 (not transcoded)
- [x] ICOSAHEDRON.mp4 -> icosahedron.mp4
- [x] 'LES MUTANTS (1).mov' -> les-mutants-1.mp4
- [x] 'LES MUTANTS (2).mov' -> les-mutants-2.mp4
- [x] 'LES MUTANTS(3).mov' -> les-mutants-3.mp4
- [x] 'LIZARD KING.mp4' -> lizard-king.mp4 (not transcoded)
- [x] 'Ojo! Don’t Slip on the Ba-nano Peal.mov' -> ojo-dont-slip-on-the-ba-nano-peal.mp4
- [x]  Post-Pangea.m4v -> post-pangea.mp4
- [x]  SANCTUM.mp4 -> sanctum.mp4
- [x] 'Tin y Pluri.m4v' -> tin-y-pluri.mp4