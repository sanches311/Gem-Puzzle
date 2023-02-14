import store from './store';
import { checkSaveGame } from './check';

const getFrameHtml = () => {
  let html = '';
  for (let i = 0; i < store.view; i++) {
    let row = '';
    for (let j = 0; j < store.view; j++) {
      if (store.out[i][j] === 0) {
        store.out[i][j] = ' ';
      }
      row += `<div class='frame-item' id='${i}${j}'>${store.out[i][j]}</div>`;
    }
    html += `<div class='frame-row'>${row}</div>`;
  }
  return html;
};
function getFrameSizeHtml() {
  let size = store.view;
  if (checkSaveGame()) {
    const saveStore = JSON.parse(localStorage.store);
    size = saveStore.view;
  }
  return `
<span class='frame-current-size'> Frame size: ${size}х${size}</span>`;
}
const getMoveHtml = () => {
  let count = store.countMove;
  if (checkSaveGame()) {
    const saveStore = JSON.parse(localStorage.store);
    count = saveStore.countMove;
  }
  return `
  <span class='count-move'>Move: ${count}</span>
  `;
};
const getTimeHtml = () => {
  let { sec } = store.time;
  let { min } = store.time;
  if (checkSaveGame()) {
    const saveStore = JSON.parse(localStorage.store);
    sec = saveStore.time.sec;
    min = saveStore.time.min;
  }
  return `
  <span class='count-time'>  Time: <span id='min' class='count-time'>${min}</span>:<span id='sec' class='count-time'>${sec}</span></span>
  `;
};

const getModalHtml = () => `
  <div class='modal-wrapper'>
    <div class='modal-content'>
      <div class='modal-win'>
      Your win!
      </div>
      <div class='modal-move'>
      ${getMoveHtml()}
      </div>
      <div class='modal-time'>
      ${getTimeHtml()}
      </div>
    </div>
  </div>
  `;

const getWinnersHtml = () => {
  let html = `
  <caption>Victory table</caption>
      <tr>
          <th>Size</th>
          <th>Move</th>
          <th>Time</th>
      </tr>
  `;
  for (let i = 0; i < store.win.length; i++) {
    html += `
    <tr>
        <td>${store.win[i].view}</td>
        <td>${store.win[i].countMove}</td>
        <td>${store.win[i].time}</td>
    </tr>`;
  }
  return html;
};

const getWinHtml = () => `
<div class='winnner'>
  <table class ="winner-content">
  </table>
  <div>
  <button class='winners-close-btn'>Close</button>
  </div>
</div>`;

function getStartHtml() {
  return `
   <div class='wrapper'>
      <div class='content'>
          <div class='menu'>
              <button id = 'shuffle-btn' class='menu-btn'>Shufle and start</button>
              <button id = 'stop-btn'class='menu-btn'>Stop</button>
              <button id = 'save-btn'class='menu-btn'>Save</button>
              <button id = 'result-btn' class='menu-btn'>Result</button>
          </div>
          <div class='info'>
              <span class='info-move'>${getMoveHtml()}</span>
              <span class='info-time'>${getTimeHtml()}</span>
          </div>
          <div class='wrapper-frame'>
          <div class='frame'>
              ${getFrameHtml()}
          </div>
          </div>
          <div class='frame-current'>
              ${getFrameSizeHtml()}
          </div>
          <span class='frame-size-tex'>Other size:</span>
          <div class='frame-all'>
            <button class='frame-size'>3х3</button>
            <button class='frame-size active-size-frame'>4х4</button>
            <button class='frame-size'>5х5</button>
            <button class='frame-size'>6х6</button>
            <button class='frame-size'>7х7</button>
            <button class='frame-size'>8х8</button>
          </div>
      </div>
  </div>
  ${getModalHtml()}
  ${getWinHtml()}`;
}

export {
  getFrameHtml, getStartHtml, getFrameSizeHtml, getMoveHtml, getModalHtml,
  getTimeHtml, getWinnersHtml,
};
