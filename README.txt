***Harbingers Player***

⚙️ TODO
- [💚] Add pause functionality.
  - [🔵] See if the shader can be paused.
  - [] Animate a smooth zooming pause symbol?
  - [x] Pause and play
- [] Add scrubbable progress bar.
- [] Better preloader feel on the <img> tag.
- [] Incorporate all the videos from the exhibition. 
- [x] Fix vertical centering issue on https://feralfile2.dev.bitmark.com/artworks/baby-video-xk5.
- [x] Fix zooming video issue.
- [x] Add to a repo and hook up to netlify.

📓 NOTES
Using ffmpeg to extract the first frame of each video:
- `ffmpeg -i input.mp4 -vf "select=eq(n\,0)" output.webp`

⚠️ TEST: https://feralfile2.dev.bitmark.com/artworks/jeffrey-u6u?fromExhibition=jeffrey-multi-unique-0c7