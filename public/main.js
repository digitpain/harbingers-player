// 🏠 Main
// Loads a video from `parameters` and applies the effect. Also handles the
// playback interface.

const wrapper = document.querySelector("#wrapper");
const video = document.querySelector("video");
const cover = document.querySelector("#cover");
const play = document.querySelector("#play");
const progress = document.querySelector("#progress");

let copyVideo = false;
let scrubbing = false;

// Loads a video from params given it's name, along with its cover image.
// Assumes its in mp4 and webp format.
function setupVideo(url) {
  video.src = "assets/" + url + ".mp4";

  cover.onload = () => cover.classList.remove("hidden");
  cover.src = "assets/" + url + ".webp";

  video.width = params.width;
  video.height = params.height;
  video.style.maxWidth = params.width + "px";
  video.style.maxHeight = params.height + "px";

  video.addEventListener(
    "canplaythrough",
    () => {
      document.body.classList.remove("loading");
      document.body.classList.add("ready");

      // On first playback...
      wrapper.addEventListener(
        "click",
        () => {
          video.play();
          video.addEventListener(
            "playing",
            () => {
              copyVideo = true;
              document.body.classList.remove("ready");
              document.body.classList.add("playing");
              play.classList.add("played");

              let isDown = false;
              let lastX;

              wrapper.addEventListener("pointerdown", (e) => {
                console.log('down');
                if (!e.isPrimary) return;
                isDown = true;
                lastX = e.x;
              });

              wrapper.addEventListener("pointermove", (e) => {
                console.log('move');
                if (!e.isPrimary) return;
                if (!isDown) return;
                scrubbing = true;
                wrapper.classList.add("scrubbing");
                video.pause();

                const deltaX = e.x - lastX;
                lastX = e.x;

                console.log(deltaX);

                const currentWidth = parseFloat(progress.style.width);
                progress.style.width = currentWidth + deltaX + "px";
              });

              wrapper.addEventListener("pointerup", (e) => {
                console.log('up');
                if (!e.isPrimary) return;
                isDown = false;
                if (scrubbing) {
                  // Progress Scrubbing
                  let newTime =
                    (parseFloat(progress.style.width) / wrapper.clientWidth) *
                    video.duration;
                  if (newTime > video.duration) {
                    newTime = 0;
                  } else if (newTime < 0) {
                    newTime = 0;
                  }
                  video.currentTime = newTime;
                  scrubbing = false;
                  if (video.paused) {
                    video.play();
                    document.body.classList.remove("paused");
                    play.classList.add("played");
                  }
                  wrapper.classList.remove("scrubbing");
                } else {
                  // Play & Pause
                  if (!video.paused) {
                    video.pause();
                    document.body.classList.add("paused");
                    play.classList.remove("played");
                    play.classList.add("subtle");
                  } else {
                    video.play();
                    document.body.classList.remove("paused");
                    play.classList.add("played");
                  }
                }
              });
            },
            { once: true }
          );
        },
        { once: true }
      );
    },
    { once: true }
  );

  video.load();
  return video;
}

// Returns a distortion value by max distortion and provenance length.
function calcDistortion(maxDistortion, provenanceLength) {
  const MAX_PROVENANCE_LENGTH = 10;
  let distortion = 0.0;
  if (provenanceLength) {
    distortion =
      0.1 +
      ((maxDistortion - 0.1) *
        Math.min(provenanceLength - 1, MAX_PROVENANCE_LENGTH - 1)) /
        (MAX_PROVENANCE_LENGTH - 1);
  }

  return distortion;
}

function initTexture(gl) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 0, 0]);
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    width,
    height,
    border,
    srcFormat,
    srcType,
    pixel
  );

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  return texture;
}

function updateTexture(gl, texture, video) {
  const level = 0;
  const internalFormat = gl.RGBA;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    level,
    internalFormat,
    srcFormat,
    srcType,
    video
  );
}

function main(provenanceLength) {
  const canvas = document.getElementById("canvas");
  const gl = canvas.getContext("webgl2");
  if (!gl) {
    alert("WebGL 2 is not supported in this environment.");
    return;
  }

  canvas.width = params.width;
  canvas.height = params.height;

  params.distortionAmount = calcDistortion(
    params.distortionAmount,
    provenanceLength
  );

  function updateDisplaySize() {
    let strW = parseInt(params.width * params.displaySize);
    canvas.style.width = strW + "px";
    canvas.style.maxWidth = strW + "px";
    let strH = parseInt(params.height * params.displaySize);
    canvas.style.height = strH + "px";
    canvas.style.maxHeight = strH + "px";
  }

  updateDisplaySize();

  const blur = new Blur(gl, params);

  const createInitTexture = function () {
    let uvTexture = [];
    for (let i = 0; i < params.width; i++) {
      for (let j = 0; j < params.height; j++) {
        u = 0;
        v = 0;
        uvTexture.push(u, v);
      }
    }
    return new Float32Array(uvTexture);
  };

  blur.setTexture(createInitTexture());

  const texture = initTexture(gl);
  const video = setupVideo(params.videoName);

  let lastVideoTime = video.currentTime;

  const render = function () {
    if (copyVideo && !video.paused && video.currentTime != lastVideoTime) {
      updateTexture(gl, texture, video);
      blur.draw(texture);

      // Update the progress bar.
      if (!scrubbing) {
        progress.style.width =
          Math.ceil(
            (video.currentTime / video.duration) * wrapper.clientWidth
          ) + "px";
      }
    lastVideoTime = video.currentTime;
    }
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
}

window.addEventListener("provenance-request-error", function (event) {
  console.warn(
    "Failed to get provenance, testing with provenance length of 3...",
    event
  );
  main(3);
});

window.addEventListener("provenance-ready", function (event) {
  let provenanceLengthAfterSale = 0;
  if (event.detail.provenances) {
    provenanceLengthAfterSale = Math.max(
      event.detail.provenances.length - 2,
      provenanceLengthAfterSale
    );
  }
  main(provenanceLengthAfterSale);
});
