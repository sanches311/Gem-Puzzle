/* eslint-disable no-restricted-syntax */
import store from './store';

const checkWin = () => {
  const { out } = store;
  const copyOut = out.concat();
  const win = [];
  for (let i = 0; i < out.length; i++) {
    for (let j = 0; j < out.length; j++) {
      win.push(copyOut[i][j]);
    }
  }
  win.splice(win.length - 1, 1);
  for (let i = 0; i < win.length - 2; i++) {
    if (win[i] + 1 !== win[i + 1]) {
      return false;
    }
  }
  return true;
};

const checkSaveGame = () => {
  const keys = Object.keys(localStorage);
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    if (key === 'store') {
      return true;
    }
  }
  return false;
};

const checkEmptyItem = () => {
  const items = document.querySelectorAll('.frame-item');
  for (const item of items) {
    if (item.textContent === ' ') {
      item.classList.add('empty-item');
    } else item.classList.remove('empty-item');
  }
};

export {
  checkWin, checkSaveGame, checkEmptyItem,
};
