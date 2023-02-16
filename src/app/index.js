import '../style/app.scss';
import { render } from './render';
import {
  listenChangeFrameSize, listenMoveItem, listenCloseModal, listenShuffle, listenSave, listenResult,
  listenCloseWinners, listenDrag,
} from './listen';

render();
listenChangeFrameSize();
listenMoveItem();
listenCloseModal();
listenShuffle();
listenSave();
listenResult();
listenCloseWinners();
listenDrag();
