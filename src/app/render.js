import {
  getStartHtml, getFrameHtml, getFrameSizeHtml, getMoveHtml, getTimeHtml,
  getWinnersHtml,
} from './ui';
import store from './store';
import { setSizeItem, setActiveItem, setDraggable } from './set';
import { checkSaveGame, checkEmptyItem } from './check';

const render = () => {
  if (checkSaveGame()) {
    const saveStore = JSON.parse(localStorage.store);
    store.view = saveStore.view;
    store.countMove = saveStore.countMove;
    store.out = saveStore.out;
  } else {
    store.fillArray();
  }
  document.body.innerHTML = getStartHtml();
  setSizeItem();
  setActiveItem();
  checkEmptyItem();
  setDraggable();
  localStorage.removeItem('store');
};
const renderFrame = () => {
  const frame = document.querySelector('.frame');
  frame.innerHTML = getFrameHtml();
};

const renderFrameSize = () => {
  const frameSize = document.querySelector('.frame-current');
  frameSize.innerHTML = getFrameSizeHtml();
};

const renderMove = () => {
  const move = document.querySelector('.info-move');
  move.innerHTML = getMoveHtml();
};

const renderTime = () => {
  const move = document.querySelector('.info-time');
  move.innerHTML = getTimeHtml();
};
const renderModal = () => {
  const modalMove = document.querySelector('.modal-move');
  modalMove.innerHTML = getMoveHtml();
  const modalTime = document.querySelector('.modal-time');
  modalTime.innerHTML = getTimeHtml();
};

const renderWinners = () => {
  const win = document.querySelector('.winner-content');
  win.innerHTML = getWinnersHtml();
};

export {
  render, renderFrame, renderFrameSize, renderMove, renderModal, renderTime, renderWinners,
};
