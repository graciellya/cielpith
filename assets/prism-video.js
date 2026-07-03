(function () {
  function initPrismVideos() {
    document.querySelectorAll("video[data-start]").forEach((video) => {
      const startAt = Number(video.dataset.start);
      if (Number.isNaN(startAt)) return;

      let lastTime = 0;

      const seekToStart = () => {
        if (video.readyState < 1) return;
        if (video.currentTime < startAt) {
          video.currentTime = startAt;
        }
      };

      ["loadedmetadata", "loadeddata", "canplay", "playing"].forEach((event) => {
        video.addEventListener(event, seekToStart);
      });

      video.addEventListener("timeupdate", () => {
        const looped = video.currentTime < lastTime - 0.5;

        if (looped || video.currentTime < startAt) {
          seekToStart();
        }

        lastTime = video.currentTime;
      });

      seekToStart();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPrismVideos);
  } else {
    initPrismVideos();
  }
})();
