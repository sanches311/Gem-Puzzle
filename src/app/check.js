import store from './store';

const checkWin = () => {
  const { out } = store;
  const copyOut = out.concat();
  const win = copyOut.flat(Infinity);
  win.splice(win.length - 1, 1);
  for (let i = 0; i < win.length; i++) {
    if (win[i] !== i + 1) {
      return false;
    }
  }
  return true;
};

const checkSaveGame = () => {
  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    if (key === 'store') {
      return true;
    }
    return false;
  });
};

const checkEmptyItem = () => {
  const items = document.querySelectorAll('.frame-item');
  items.forEach((item) => {
    if (item.textContent === ' ') {
      item.classList.add('empty-item');
    } else item.classList.remove('empty-item');
  });
};
export {
  checkWin, checkSaveGame, checkEmptyItem,
};
