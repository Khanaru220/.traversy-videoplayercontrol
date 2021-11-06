'use strict';

const btnPlayEl = document.querySelector('.btn-play');
const btnStopEl = document.querySelector('.btn-stop');
const videoEl = document.querySelector('.video');
const progressInputEl = document.querySelector('.progress-bar');
const timeStampEl = document.querySelector('.time');
// -------------------------
// ----------- EVENT HANDLER
// -------------------------

const play = function () {
  // pause --> play
  videoEl.play();
  btnPlayEl.classList.add('btn-pause');
  btnPlayEl.classList.remove('btn-play');
  btnPlayEl.querySelector('ion-icon').setAttribute('name', 'pause');
};

const pause = function () {
  // play --> pause
  videoEl.pause();
  btnPlayEl.classList.add('btn-play');
  btnPlayEl.classList.remove('btn-pause');
  btnPlayEl.querySelector('ion-icon').setAttribute('name', 'play');
};

const progressBar = function () {
  // 1.update
  progressInputEl.value = Math.floor(
    (videoEl.currentTime / videoEl.duration) * 100
  );
};

const updateTimeStamp = function () {
  // 1. update timestamp
  // mins
  const min = Math.floor(videoEl.currentTime / 60);
  timeStampEl.innerText = String(min < 10 ? `0${min}` : `${min}`);

  const sec = Math.floor(videoEl.currentTime % 60);
  timeStampEl.innerText += String(sec < 10 ? `:0${sec}` : `:${sec}`);
};

// -------------------------
// ----------- ADD EVENTLISTENER
// -------------------------

btnPlayEl.addEventListener('click', function () {
  if (videoEl.paused) play();
  else pause();
});

videoEl.addEventListener('click', function () {
  if (videoEl.paused) play();
  else pause();
});

btnStopEl.addEventListener('click', function () {
  // not care played or paused
  pause();
  videoEl.currentTime = 0;
});

progressInputEl.addEventListener('change', function () {
  // 1. change currentTime base on (%value * duration)
  videoEl.currentTime = (+progressInputEl.value / 100) * videoEl.duration;
});

// duration: total time
// currenTime: timestamp
// 'timeupdate' --> when currentTime change
// condition: time > 1.3 --> time === 1 (take interger)
// Math.floor()

videoEl.addEventListener('timeupdate', function () {
  // 1.
  updateTimeStamp();
  // 2.update progress-bar
  progressBar();
});

videoEl.addEventListener('ended', function () {
  pause();
});
