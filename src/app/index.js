import '../style/app.scss';
import { render } from './render';
import {
  listenChangeFrameSize, listenMoveItem, listenCloseModal, listenShuffle, listenSave, listenResult,
  listenCloseWinners, listenDrag,
} from './listen';
import { getTime } from './utils';

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
