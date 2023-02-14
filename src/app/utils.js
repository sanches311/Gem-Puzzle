import store from './store';
import { checkSaveGame } from './check';

const HEX = ['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/* eslint-disable no-param-reassign */
const hide = (element) => {
  element.style = 'display:none';
};
const show = (element) => {
  element.style = 'display:flex';
};
const getTime = () => {
  function tick() {
    if (checkSaveGame()) {
      const saveStore = JSON.parse(localStorage.store);
      store.time.sec = saveStore.time.sec;
      store.time.min = saveStore.time.min;
    }
    store.time.sec += 1;
    store.time.min += Math.floor(store.time.sec / 60);
    if (store.time.sec > 59) {
      store.time.sec = 0;
    }

    document.getElementById('sec').childNodes[0].nodeValue = store.time.sec;
    document.getElementById('min').childNodes[0].nodeValue = store.time.min;
  }
  const timerId = setInterval(tick, 1000);
  document.addEventListener('click', (event) => {
    if (event.target.closest('#stop-btn')) {
      clearInterval(timerId);
      store.time.sec = document.getElementById('sec').childNodes[0].nodeValue;
      store.time.min = document.getElementById('min').childNodes[0].nodeValue;
    }
  });
};

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const generateColor = () => `#${HEX[random(0, 15)]}${HEX[random(0, 15)]}${HEX[random(0, 15)]}${HEX[random(0, 15)]}${HEX[random(0, 15)]}${
  HEX[random(0, 15)]
}`;
const setColor = () => {
  const puzzles = document.querySelectorAll('.frame-item');
  // eslint-disable-next-line no-return-assign
  puzzles.forEach((puzzle) => puzzle.style.background = `${generateColor()}`);
};

export {
  hide, show, getTime, generateColor, setColor,
};
