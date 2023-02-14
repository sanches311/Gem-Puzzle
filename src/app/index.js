import '../style/app.scss';
import { render } from './render';
import {
  listenChangeFrameSize, listenMoveItem, listenCloseModal, listenShuffle, listenSave, listenResult,
  listenCloseWinners, listenDrag,
} from './listen';
import { getTime } from './utils';
import url from '../public/assets/img/jason-leung-Xaanw0s0pMk-unsplash.jpg';

render();
listenChangeFrameSize();
listenMoveItem();
listenCloseModal();
listenShuffle();
listenSave();
getTime();
listenResult();
listenCloseWinners();
listenDrag();

const wrapper = document.querySelector('.wrapper');
wrapper.style.backgroundImage = `url(${url})`;
wrapper.style.background = 'contain';
// eslint-disable-next-line no-console
console.log(wrapper);
