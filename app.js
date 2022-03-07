const start = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
let time = 0;
let score = 0;

start.addEventListener('click', (e) => {
  e.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (e) => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(e.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', (e) => {
  if (e.target.classList.contains('circle')) {
    score++;
    e.target.remove();
    createRandomDots();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomDots();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let currentTime = --time;
    if (currentTime < 10) {
      currentTime = `0${currentTime}`;
    }
    setTime(currentTime);
  }
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Cчет: <span class='primary'>${score}</span></h1>`;
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function createRandomDots() {
  const dot = document.createElement('div');
  const size = dotsRandomizer(10, 60);
  const { width, height } = board.getBoundingClientRect();

  const x = dotsRandomizer(0, width - size);
  const y = dotsRandomizer(0, height - size);
  const dotColor = colorRandomizer();

  dot.style.top = `${y}px`;
  dot.style.left = `${x}px`;

  dot.classList.add('circle');
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.background = dotColor;
  board.append(dot);
}

function colorRandomizer() {
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  return color;
}

function dotsRandomizer(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
