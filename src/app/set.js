import store from './store';

/* eslint-disable no-restricted-syntax */
const setSizeItem = () => {
  const rows = document.querySelectorAll('.frame-row');
  const sizeFrame = store.view;
  const sizeItem = `${100 / sizeFrame}%`;
  for (const row of rows) {
    row.style.height = sizeItem;
  }
  const columns = document.querySelectorAll('.frame-item');
  for (const column of columns) {
    column.style.width = sizeItem;
  }
};
const setActiveItem = () => {
  const valuesOfSize = document.querySelectorAll('.frame-size');
  const size = store.view;
  for (const valueOfSize of valuesOfSize) {
    if (Number(valueOfSize.textContent[0]) === size) {
      valueOfSize.classList.add('active-size-frame');
    } else valueOfSize.classList.remove('active-size-frame');
  }
};

const setTime = () => {
  store.time.min = 0;
  store.time.sec = 0;
  document.getElementById('sec').childNodes[0].nodeValue = 0;
  document.getElementById('min').childNodes[0].nodeValue = 0;
};
const getEmptyItem = () => document.querySelector('.empty-item');

const moveRight = () => {
  const id = String(store.moveRight);
  const item = document.getElementById(id);
  item.classList.add('move-right');
  item.addEventListener('animationend', () => {
    item.classList.remove('move-right');
    delete store.moveRight;
  });
};
const moveLeft = () => {
  const id = String(store.moveLeft);
  const item = document.getElementById(id);
  item.classList.add('move-left');
  item.addEventListener('animationend', () => {
    item.classList.remove('move-left');
    delete store.moveLeft;
  });
};
const moveUp = () => {
  const id = String(store.moveUp);
  const item = document.getElementById(id);
  item.classList.add('move-up');
  item.addEventListener('animationend', () => {
    item.classList.remove('move-up');
    delete store.moveUp;
  });
};
const moveDown = () => {
  const id = String(store.moveDown);
  const item = document.getElementById(id);
  item.classList.add('move-down');
  item.addEventListener('animationend', () => {
    item.classList.remove('move-down');
    delete store.moveDown;
  });
};
const setMove = () => {
  const keys = Object.keys(store);
  for (const key of keys) {
    if (key === 'moveRight') {
      moveRight();
    }
    if (key === 'moveLeft') {
      moveLeft();
    }
    if (key === 'moveUp') {
      moveUp();
    }
    if (key === 'moveDown') {
      moveDown();
    }
  }
};

const setSoundMove = () => {
  const audio = new Audio();
  audio.src = '../public/assets/sound/schelchok.mp3';
  audio.autoplay = true;
};

const setDraggable = () => {
  const empty = document.querySelector('.empty-item');
  const i = Number(empty.id[0]);
  const j = Number(empty.id[1]);
  if (j !== store.out.length - 1) {
    const id = String(i) + String(j + 1);
    document.getElementById(id).setAttribute('draggable', true);
    document.getElementById(id).style.cursor = 'move';
  }
  if (j !== 0) {
    const id = String(i) + String(j - 1);
    document.getElementById(id).setAttribute('draggable', true);
    document.getElementById(id).style.cursor = 'move';
  }
  if (i !== store.out.length - 1) {
    const id = String(i + 1) + String(j);
    document.getElementById(id).setAttribute('draggable', true);
    document.getElementById(id).style.cursor = 'move';
  }
  if (i !== 0) {
    const id = String(i - 1) + String(j);
    document.getElementById(id).setAttribute('draggable', true);
    document.getElementById(id).style.cursor = 'move';
  }
};

export {
  setActiveItem, setSizeItem, setTime, setMove, setSoundMove, setDraggable, getEmptyItem,
};
