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
  let html = '';
  for (let i = 0; i < store.win.length; i++) {
    html += `<div class='win-item'>${i} size:${store.win[i].view}, moves: ${store.win[i].countMove}, time:${store.win[i].time} <div>`;
  }
  return html;
};

const getWinHtml = () => `
<div class='winnner'>
  <div class ="winner-content">    
  </div>
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
          <div class='frame'>
              ${getFrameHtml()}
          </div>
          <div class='frame-current'>            
              ${getFrameSizeHtml()}
          </div>
          <div class='Frame-all'>
            <span class='frame-size-tex'>Other size:</span>
            <span class='frame-size'>3х3</span>
            <span class='frame-size active-size-frame'>4х4</span>
            <span class='frame-size'>5х5</span>
            <span class='frame-size'>6х6</span>
            <span class='frame-size'>7х7</span>
            <span class='frame-size'>8х8</span>           
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
