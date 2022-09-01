***Harbingers Player***

⚙️ TODO
- [] Incorporate all the videos from the exhibition. 
  - [] Transcribe each video.
  - [] Generate a still for each video.
- [x] Better preloader feel on the <img> tag?
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