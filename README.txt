***Harbingers Player***

⚙️ TODO
- [] Fix zooming video issue.
- [] Fix vertical centering issue on https://feralfile2.dev.bitmark.com/artworks/baby-video-xk5.
- [] Add play / pause.
  - [] Animate a smooth zooming pause symbol?
  - [] See if the shader can be paused.
- [] Add scrubbable progress bar.
- [x] Add to a repo and hook up to netlify.


📓 NOTES
Using ffmpeg to extract the first frame of each video:
- `ffmpeg -i input.mp4 -vf "select=eq(n\,0)" output.webp`

⚠️ TEST: https://feralfile2.dev.bitmark.com/artworks/jeffrey-u6u?fromExhibition=jeffrey-multi-unique-0c7