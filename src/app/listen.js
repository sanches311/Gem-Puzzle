import {
  renderFrame, renderFrameSize, renderMove, renderModal, renderWinners,
} from './render';
import store from './store';
import {
  setSizeItem, setTime, setMove, setSoundMove, setDraggable, getEmptyItem,
} from './set';
import { checkWin, checkEmptyItem } from './check';
import { hide, show } from './utils';

function listenDrag() {
  const empty = getEmptyItem();
  document.addEventListener('dragstart', (event) => {
    event.target.classList.add('selected');
  });
  document.addEventListener('dragend', (event) => {
    event.preventDefault();
    event.target.classList.remove('selected');
  });
  empty.addEventListener('dragover', (event) => {
    event.preventDefault();
    empty.classList.add('active-dropzone');
  }, false);
  empty.addEventListener('dragleave', (event) => {
    event.preventDefault();
    empty.classList.remove('active-dropzone');
  });
  empty.addEventListener('drop', (event) => {
    event.preventDefault();
    const selected = document.querySelector('.selected');
    if (event.target.closest('.empty-item')) {
      event.target.classList.remove('active-dropzone');
      const selectedIdI = selected.id[0];
      const selectedIdJ = selected.id[1];
      const emptyIdI = getEmptyItem().id[0];
      const emptyIdJ = getEmptyItem().id[1];
      store.out[emptyIdI][emptyIdJ] = store.out[selectedIdI][selectedIdJ];
      store.out[selectedIdI][selectedIdJ] = ' ';
      store.countMove += 1;
      setSoundMove();
      renderFrame();
      setSizeItem();
      renderMove();
      checkEmptyItem();
      setMove();
      setDraggable();
      if (checkWin()) {
        const modal = document.querySelector('.modal-wrapper');
        renderModal();
        show(modal);
        store.time.sec = document.getElementById('sec').childNodes[0].nodeValue;
        store.time.min = document.getElementById('min').childNodes[0].nodeValue;
        store.win.push({ view: `${store.view}х${store.view}`, countMove: `${store.countMove}`, time: `${store.time.min}:${store.time.sec}` });
      }
    }
    return listenDrag();
  });
}
const listenChangeFrameSize = () => {
  document.addEventListener('click', (event) => {
    if (event.target.closest('.frame-size')) {
      document.querySelector('.active-size-frame').classList.remove('active-size-frame');
      event.target.classList.add('active-size-frame');
      store.view = Number(event.target.textContent[0]);
      store.out.length = 0;
      store.countMove = 0;
      store.fillArray();
      renderFrame();
      renderFrameSize();
      renderMove();
      setSizeItem();
      checkEmptyItem();
      setTime();
      setDraggable();
      listenDrag();
    }
  });
};
const listenMoveItem = () => {
  document.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.closest('.frame-item')) {
      event.preventDefault();
      const i = Number(event.target.id[0]);
      const j = Number(event.target.id[1]);
      if (j !== store.out.length - 1) {
        if (store.out[i][j + 1] === ' ') {
          store.out[i][j + 1] = store.out[i][j];
          store.out[i][j] = 0;
          store.countMove += 1;
          const id = String(i) + String(j + 1);
          store.moveRight = id;
          setSoundMove();
        }
      }
      if (j !== 0) {
        if (store.out[i][j - 1] === ' ') {
          store.out[i][j - 1] = store.out[i][j];
          store.out[i][j] = 0;
          store.countMove += 1;
          const id = String(i) + String(j - 1);
          store.moveLeft = id;
          setSoundMove();
        }
      }
      if (i !== store.out.length - 1) {
        if (store.out[i + 1][j] === ' ') {
          store.out[i + 1][j] = store.out[i][j];
          store.out[i][j] = 0;
          store.countMove += 1;
          const id = String(i + 1) + String(j);
          store.moveDown = id;
          setSoundMove();
        }
      }
      if (i !== 0) {
        if (store.out[i - 1][j] === ' ') {
          store.out[i - 1][j] = store.out[i][j];
          store.out[i][j] = 0;
          store.countMove += 1;
          const id = String(i - 1) + String(j);
          store.moveUp = id;
          setSoundMove();
        }
      }
      renderFrame();
      setSizeItem();
      renderMove();
      checkEmptyItem();
      setMove();
      setDraggable();
      listenDrag();
      if (checkWin()) {
        const modal = document.querySelector('.modal-wrapper');
        renderModal();
        show(modal);
        store.time.sec = document.getElementById('sec').childNodes[0].nodeValue;
        store.time.min = document.getElementById('min').childNodes[0].nodeValue;
        store.win.push({ view: `${store.view}х${store.view}`, countMove: `${store.countMove}`, time: `${store.time.min}:${store.time.sec}` });
      }
    }
  });
};

const listenCloseModal = () => {
  document.addEventListener('click', (event) => {
    if (event.target.closest('.modal-wrapper')) {
      const modal = document.querySelector('.modal-wrapper');
      hide(modal);
      store.countMove = 0;
      renderMove();
      setTime();
    }
  });
};

const listenShuffle = () => {
  document.addEventListener('click', (event) => {
    if (event.target.closest('#shuffle-btn')) {
      store.countMove = 0;
      store.out.length = 0;
      store.fillArray();
      renderFrame();
      renderMove();
      setSizeItem();
      checkEmptyItem();
      setTime();
      setDraggable();
      listenDrag();
    }
  });
};

const listenSave = () => {
  document.addEventListener('click', (event) => {
    if (event.target.closest('#save-btn')) {
      const keys = Object.keys(localStorage);
      // eslint-disable-next-line no-restricted-syntax
      for (const key of keys) {
        if (key === store) {
          localStorage.removeItem('store');
        }
      }
      localStorage.store = JSON.stringify(store);
    }
  });
};

const listenResult = () => {
  document.addEventListener('click', (event) => {
    if (event.target.closest('#result-btn')) {
      const game = document.querySelector('.wrapper');
      const winners = document.querySelector('.winnner');
      game.style = 'display:none';
      winners.style = 'display:flex';
      renderWinners();
    }
  });
};

const listenCloseWinners = () => {
  document.addEventListener('click', (event) => {
    if (event.target.closest('.winners-close-btn')) {
      const game = document.querySelector('.wrapper');
      const winners = document.querySelector('.winnner');
      game.style = 'display:flex';
      winners.style = 'display:none';
    }
  });
};
export {
  listenChangeFrameSize, listenMoveItem, listenCloseModal, listenShuffle, listenSave, listenResult,
  listenCloseWinners, listenDrag,
};
