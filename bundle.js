/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/check.js":
/*!**************************!*\
  !*** ./src/app/check.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkEmptyItem": () => (/* binding */ checkEmptyItem),
/* harmony export */   "checkSaveGame": () => (/* binding */ checkSaveGame),
/* harmony export */   "checkWin": () => (/* binding */ checkWin)
/* harmony export */ });
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ "./src/app/store.js");

var checkWin = function checkWin() {
  var out = _store__WEBPACK_IMPORTED_MODULE_0__["default"].out;
  var copyOut = out.concat();
  var win = copyOut.flat(Infinity);
  win.splice(win.length - 1, 1);
  for (var i = 0; i < win.length; i++) {
    if (win[i] !== i + 1) {
      return false;
    }
  }
  return true;
};
var checkSaveGame = function checkSaveGame() {
  var keys = Object.keys(localStorage);
  keys.forEach(function (key) {
    if (key === 'store') {
      return true;
    }
    return false;
  });
};
var checkEmptyItem = function checkEmptyItem() {
  var items = document.querySelectorAll('.frame-item');
  items.forEach(function (item) {
    if (item.textContent === ' ') {
      item.classList.add('empty-item');
    } else item.classList.remove('empty-item');
  });
};


/***/ }),

/***/ "./src/app/listen.js":
/*!***************************!*\
  !*** ./src/app/listen.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "listenChangeFrameSize": () => (/* binding */ listenChangeFrameSize),
/* harmony export */   "listenCloseModal": () => (/* binding */ listenCloseModal),
/* harmony export */   "listenCloseWinners": () => (/* binding */ listenCloseWinners),
/* harmony export */   "listenDrag": () => (/* binding */ listenDrag),
/* harmony export */   "listenMoveItem": () => (/* binding */ listenMoveItem),
/* harmony export */   "listenResult": () => (/* binding */ listenResult),
/* harmony export */   "listenSave": () => (/* binding */ listenSave),
/* harmony export */   "listenShuffle": () => (/* binding */ listenShuffle)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render */ "./src/app/render.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/app/store.js");
/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./set */ "./src/app/set.js");
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./check */ "./src/app/check.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/app/utils.js");





function listenDrag() {
  var empty = (0,_set__WEBPACK_IMPORTED_MODULE_2__.getEmptyItem)();
  // eslint-disable-next-line consistent-return
  document.addEventListener('dragstart', function (event) {
    // eslint-disable-next-line no-alert
    if (!_store__WEBPACK_IMPORTED_MODULE_1__["default"].start) return alert('Press shuffle and start to start the game');
    event.target.classList.add('selected');
  });
  document.addEventListener('dragend', function (event) {
    event.preventDefault();
    event.target.classList.remove('selected');
  });
  empty.addEventListener('dragover', function (event) {
    event.preventDefault();
    empty.classList.add('active-dropzone');
  }, false);
  empty.addEventListener('dragleave', function (event) {
    event.preventDefault();
    empty.classList.remove('active-dropzone');
  });
  empty.addEventListener('drop', function (event) {
    event.preventDefault();
    var selected = document.querySelector('.selected');
    if (event.target.closest('.empty-item')) {
      event.target.classList.remove('active-dropzone');
      var selectedIdI = selected.id[0];
      var selectedIdJ = selected.id[1];
      var emptyIdI = (0,_set__WEBPACK_IMPORTED_MODULE_2__.getEmptyItem)().id[0];
      var emptyIdJ = (0,_set__WEBPACK_IMPORTED_MODULE_2__.getEmptyItem)().id[1];
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].out[emptyIdI][emptyIdJ] = _store__WEBPACK_IMPORTED_MODULE_1__["default"].out[selectedIdI][selectedIdJ];
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].out[selectedIdI][selectedIdJ] = ' ';
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].countMove += 1;
      (0,_set__WEBPACK_IMPORTED_MODULE_2__.setSoundMove)();
      (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderFrame)();
      (0,_set__WEBPACK_IMPORTED_MODULE_2__.setSizeItem)();
      (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderMove)();
      (0,_check__WEBPACK_IMPORTED_MODULE_3__.checkEmptyItem)();
      (0,_set__WEBPACK_IMPORTED_MODULE_2__.setMove)();
      (0,_set__WEBPACK_IMPORTED_MODULE_2__.setDraggable)();
      if ((0,_check__WEBPACK_IMPORTED_MODULE_3__.checkWin)()) {
        var modal = document.querySelector('.modal-wrapper');
        (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderModal)();
        (0,_utils__WEBPACK_IMPORTED_MODULE_4__.show)(modal);
        _store__WEBPACK_IMPORTED_MODULE_1__["default"].time.sec = document.getElementById('sec').childNodes[0].nodeValue;
        _store__WEBPACK_IMPORTED_MODULE_1__["default"].time.min = document.getElementById('min').childNodes[0].nodeValue;
        _store__WEBPACK_IMPORTED_MODULE_1__["default"].win.push({
          view: "".concat(_store__WEBPACK_IMPORTED_MODULE_1__["default"].view, "\u0445").concat(_store__WEBPACK_IMPORTED_MODULE_1__["default"].view),
          countMove: "".concat(_store__WEBPACK_IMPORTED_MODULE_1__["default"].countMove),
          time: "".concat(_store__WEBPACK_IMPORTED_MODULE_1__["default"].time.min, ":").concat(_store__WEBPACK_IMPORTED_MODULE_1__["default"].time.sec)
        });
      }
    }
    return listenDrag();
  });
}
var listenChangeFrameSize = function listenChangeFrameSize() {
  document.addEventListener('click', function (event) {
    if (event.target.closest('.frame-size')) {
      document.querySelector('.active-size-frame').classList.remove('active-size-frame');
      event.target.classList.add('active-size-frame');
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].view = Number(event.target.textContent[0]);
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].start = false;
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].out.length = 0;
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].countMove = 0;
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].initArray();
      (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderFrame)();
      (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderFrameSize)();
      (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderMove)();
      (0,_set__WEBPACK_IMPORTED_MODULE_2__.setSizeItem)();
      (0,_check__WEBPACK_IMPORTED_MODULE_3__.checkEmptyItem)();
      (0,_set__WEBPACK_IMPORTED_MODULE_2__.getEmptyItem)();
      (0,_set__WEBPACK_IMPORTED_MODULE_2__.setTime)();
      (0,_set__WEBPACK_IMPORTED_MODULE_2__.setDraggable)();
      listenDrag();
    }
  });
};
var listenMoveItem = function listenMoveItem() {
  // eslint-disable-next-line consistent-return
  document.addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.closest('.frame-item')) {
      event.preventDefault();
      // eslint-disable-next-line no-alert
      if (!_store__WEBPACK_IMPORTED_MODULE_1__["default"].start) return alert('Press shuffle and start to start the game');
      var i = Number(event.target.id[0]);
      var j = Number(event.target.id[1]);
      if (j !== _store__WEBPACK_IMPORTED_MODULE_1__["default"].out.length - 1) {
        if (_store__WEBPACK_IMPORTED_MODULE_1__["default"].out[i][j + 1] === ' ') {
          _store__WEBPACK_IMPORTED_MODULE_1__["default"].out[i][j + 1] = _store__WEBPACK_IMPORTED_MODULE_1__["default"].out[i][j];
          _store__WEBPACK_IMPORTED_MODULE_1__["default"].out[i][j] = 0;
          _store__WEBPACK_IMPORTED_MODULE_1__["default"].countMove += 1;
          var id = String(i) + String(j + 1);
          _store__WEBPACK_IMPORTED_MODULE_1__["default"].moveRight = id;
          (0,_set__WEBPACK_IMPORTED_MODULE_2__.setSoundMove)();
        }
      }
      if (j !== 0) {
        if (_store__WEBPACK_IMPORTED_MODULE_1__["default"].out[i][j - 1] === ' ') {
          _store__WEBPACK_IMPORTED_MODULE_1__["default"].out[i][j - 1] = _store__WEBPACK_IMPORTED_MODULE_1__["default"].out[i][j];
          _store__WEBPACK_IMPORTED_MODULE_1__["default"].out[i][j] = 0;
          _store__WEBPACK_IMPORTED_MODULE_1__["default"].countMove += 1;
          var _id = String(i) + String(j - 1);
          _store__WEBPACK_IMPORTED_MODULE_1__["default"].moveLeft = _id;
          (0,_set__WEBPACK_IMPORTED_MODULE_2__.setSoundMove)();
        }
      }
      if (i !== _store__WEBPACK_IMPORTED_MODULE_1__["default"].out.length - 1) {
        if (_store__WEBPACK_IMPORTED_MODULE_1__["default"].out[i + 1][j] === ' ') {
          _store__WEBPACK_IMPORTED_MODULE_1__["default"].out[i + 1][j] = _store__WEBPACK_IMPORTED_MODULE_1__["default"].out[i][j];
          _store__WEBPACK_IMPORTED_MODULE_1__["default"].out[i][j] = 0;
          _store__WEBPACK_IMPORTED_MODULE_1__["default"].countMove += 1;
          var _id2 = String(i + 1) + String(j);
          _store__WEBPACK_IMPORTED_MODULE_1__["default"].moveDown = _id2;
          (0,_set__WEBPACK_IMPORTED_MODULE_2__.setSoundMove)();
        }
      }
      if (i !== 0) {
        if (_store__WEBPACK_IMPORTED_MODULE_1__["default"].out[i - 1][j] === ' ') {
          _store__WEBPACK_IMPORTED_MODULE_1__["default"].out[i - 1][j] = _store__WEBPACK_IMPORTED_MODULE_1__["default"].out[i][j];
          _store__WEBPACK_IMPORTED_MODULE_1__["default"].out[i][j] = 0;
          _store__WEBPACK_IMPORTED_MODULE_1__["default"].countMove += 1;
          var _id3 = String(i - 1) + String(j);
          _store__WEBPACK_IMPORTED_MODULE_1__["default"].moveUp = _id3;
          (0,_set__WEBPACK_IMPORTED_MODULE_2__.setSoundMove)();
        }
      }
      (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderFrame)();
      (0,_set__WEBPACK_IMPORTED_MODULE_2__.setSizeItem)();
      (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderMove)();
      (0,_check__WEBPACK_IMPORTED_MODULE_3__.checkEmptyItem)();
      (0,_set__WEBPACK_IMPORTED_MODULE_2__.setMove)();
      (0,_set__WEBPACK_IMPORTED_MODULE_2__.setDraggable)();
      listenDrag();
      if ((0,_check__WEBPACK_IMPORTED_MODULE_3__.checkWin)()) {
        var modal = document.querySelector('.modal-wrapper');
        (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderModal)();
        (0,_utils__WEBPACK_IMPORTED_MODULE_4__.show)(modal);
        _store__WEBPACK_IMPORTED_MODULE_1__["default"].time.sec = document.getElementById('sec').childNodes[0].nodeValue;
        _store__WEBPACK_IMPORTED_MODULE_1__["default"].time.min = document.getElementById('min').childNodes[0].nodeValue;
        _store__WEBPACK_IMPORTED_MODULE_1__["default"].win.push({
          view: "".concat(_store__WEBPACK_IMPORTED_MODULE_1__["default"].view, "\u0445").concat(_store__WEBPACK_IMPORTED_MODULE_1__["default"].view),
          countMove: "".concat(_store__WEBPACK_IMPORTED_MODULE_1__["default"].countMove),
          time: "".concat(_store__WEBPACK_IMPORTED_MODULE_1__["default"].time.min, ":").concat(_store__WEBPACK_IMPORTED_MODULE_1__["default"].time.sec)
        });
      }
    }
  });
};
var listenCloseModal = function listenCloseModal() {
  document.addEventListener('click', function (event) {
    if (event.target.closest('.modal-wrapper')) {
      var modal = document.querySelector('.modal-wrapper');
      (0,_utils__WEBPACK_IMPORTED_MODULE_4__.hide)(modal);
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].countMove = 0;
      (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderMove)();
      (0,_set__WEBPACK_IMPORTED_MODULE_2__.setTime)();
    }
  });
};
var listenShuffle = function listenShuffle() {
  document.addEventListener('click', function (event) {
    if (event.target.closest('#shuffle-btn')) {
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].countMove = 0;
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].out.length = 0;
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].start = true;
      _store__WEBPACK_IMPORTED_MODULE_1__["default"].fillArray();
      (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderFrame)();
      (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderMove)();
      (0,_set__WEBPACK_IMPORTED_MODULE_2__.setSizeItem)();
      (0,_check__WEBPACK_IMPORTED_MODULE_3__.checkEmptyItem)();
      (0,_set__WEBPACK_IMPORTED_MODULE_2__.setTime)();
      (0,_set__WEBPACK_IMPORTED_MODULE_2__.setDraggable)();
      listenDrag();
      (0,_utils__WEBPACK_IMPORTED_MODULE_4__.getTime)();
    }
  });
};
var listenSave = function listenSave() {
  document.addEventListener('click', function (event) {
    if (event.target.closest('#save-btn')) {
      var keys = Object.keys(localStorage);
      // eslint-disable-next-line no-restricted-syntax
      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
        var key = _keys[_i];
        if (key === _store__WEBPACK_IMPORTED_MODULE_1__["default"]) {
          localStorage.removeItem('store');
        }
      }
      localStorage.store = JSON.stringify(_store__WEBPACK_IMPORTED_MODULE_1__["default"]);
    }
  });
};
var listenResult = function listenResult() {
  document.addEventListener('click', function (event) {
    if (event.target.closest('#result-btn')) {
      var game = document.querySelector('.wrapper');
      var winners = document.querySelector('.winnner');
      game.style = 'display:none';
      winners.style = 'display:flex';
      (0,_render__WEBPACK_IMPORTED_MODULE_0__.renderWinners)();
    }
  });
};
var listenCloseWinners = function listenCloseWinners() {
  document.addEventListener('click', function (event) {
    if (event.target.closest('.winners-close-btn')) {
      var game = document.querySelector('.wrapper');
      var winners = document.querySelector('.winnner');
      game.style = 'display:flex';
      winners.style = 'display:none';
    }
  });
};


/***/ }),

/***/ "./src/app/render.js":
/*!***************************!*\
  !*** ./src/app/render.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "renderFrame": () => (/* binding */ renderFrame),
/* harmony export */   "renderFrameSize": () => (/* binding */ renderFrameSize),
/* harmony export */   "renderModal": () => (/* binding */ renderModal),
/* harmony export */   "renderMove": () => (/* binding */ renderMove),
/* harmony export */   "renderTime": () => (/* binding */ renderTime),
/* harmony export */   "renderWinners": () => (/* binding */ renderWinners)
/* harmony export */ });
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ "./src/app/ui.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/app/store.js");
/* harmony import */ var _set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./set */ "./src/app/set.js");
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./check */ "./src/app/check.js");




var render = function render() {
  if ((0,_check__WEBPACK_IMPORTED_MODULE_3__.checkSaveGame)()) {
    var saveStore = JSON.parse(localStorage.store);
    _store__WEBPACK_IMPORTED_MODULE_1__["default"].view = saveStore.view;
    _store__WEBPACK_IMPORTED_MODULE_1__["default"].countMove = saveStore.countMove;
    _store__WEBPACK_IMPORTED_MODULE_1__["default"].out = saveStore.out;
  } else {
    _store__WEBPACK_IMPORTED_MODULE_1__["default"].initArray();
  }
  document.body.innerHTML = (0,_ui__WEBPACK_IMPORTED_MODULE_0__.getStartHtml)();
  (0,_set__WEBPACK_IMPORTED_MODULE_2__.setSizeItem)();
  (0,_set__WEBPACK_IMPORTED_MODULE_2__.setActiveItem)();
  (0,_check__WEBPACK_IMPORTED_MODULE_3__.checkEmptyItem)();
  (0,_set__WEBPACK_IMPORTED_MODULE_2__.setDraggable)();
  localStorage.removeItem('store');
};
var renderFrame = function renderFrame() {
  var frame = document.querySelector('.frame');
  frame.innerHTML = (0,_ui__WEBPACK_IMPORTED_MODULE_0__.getFrameHtml)();
};
var renderFrameSize = function renderFrameSize() {
  var frameSize = document.querySelector('.frame-current');
  frameSize.innerHTML = (0,_ui__WEBPACK_IMPORTED_MODULE_0__.getFrameSizeHtml)();
};
var renderMove = function renderMove() {
  var move = document.querySelector('.info-move');
  move.innerHTML = (0,_ui__WEBPACK_IMPORTED_MODULE_0__.getMoveHtml)();
};
var renderTime = function renderTime() {
  var move = document.querySelector('.info-time');
  move.innerHTML = (0,_ui__WEBPACK_IMPORTED_MODULE_0__.getTimeHtml)();
};
var renderModal = function renderModal() {
  var modalMove = document.querySelector('.modal-move');
  modalMove.innerHTML = (0,_ui__WEBPACK_IMPORTED_MODULE_0__.getMoveHtml)();
  var modalTime = document.querySelector('.modal-time');
  modalTime.innerHTML = (0,_ui__WEBPACK_IMPORTED_MODULE_0__.getTimeHtml)();
};
var renderWinners = function renderWinners() {
  var win = document.querySelector('.winner-content');
  win.innerHTML = (0,_ui__WEBPACK_IMPORTED_MODULE_0__.getWinnersHtml)();
};


/***/ }),

/***/ "./src/app/set.js":
/*!************************!*\
  !*** ./src/app/set.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getEmptyItem": () => (/* binding */ getEmptyItem),
/* harmony export */   "setActiveItem": () => (/* binding */ setActiveItem),
/* harmony export */   "setDraggable": () => (/* binding */ setDraggable),
/* harmony export */   "setMove": () => (/* binding */ setMove),
/* harmony export */   "setSizeItem": () => (/* binding */ setSizeItem),
/* harmony export */   "setSoundMove": () => (/* binding */ setSoundMove),
/* harmony export */   "setTime": () => (/* binding */ setTime)
/* harmony export */ });
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ "./src/app/store.js");
/* harmony import */ var _public_assets_sound_schelchok_mp3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../public/assets/sound/schelchok.mp3 */ "./src/public/assets/sound/schelchok.mp3");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



/* eslint-disable no-restricted-syntax */
var setSizeItem = function setSizeItem() {
  var rows = document.querySelectorAll('.frame-row');
  var sizeFrame = _store__WEBPACK_IMPORTED_MODULE_0__["default"].view;
  var sizeItem = "".concat(100 / sizeFrame, "%");
  var _iterator = _createForOfIteratorHelper(rows),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var row = _step.value;
      row.style.height = sizeItem;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var columns = document.querySelectorAll('.frame-item');
  var _iterator2 = _createForOfIteratorHelper(columns),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var column = _step2.value;
      column.style.width = sizeItem;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
};
var setActiveItem = function setActiveItem() {
  var valuesOfSize = document.querySelectorAll('.frame-size');
  var size = _store__WEBPACK_IMPORTED_MODULE_0__["default"].view;
  var _iterator3 = _createForOfIteratorHelper(valuesOfSize),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var valueOfSize = _step3.value;
      if (Number(valueOfSize.textContent[0]) === size) {
        valueOfSize.classList.add('active-size-frame');
      } else valueOfSize.classList.remove('active-size-frame');
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
};
var setTime = function setTime() {
  _store__WEBPACK_IMPORTED_MODULE_0__["default"].time.min = 0;
  _store__WEBPACK_IMPORTED_MODULE_0__["default"].time.sec = 0;
  document.getElementById('sec').childNodes[0].nodeValue = 0;
  document.getElementById('min').childNodes[0].nodeValue = 0;
};
var getEmptyItem = function getEmptyItem() {
  return document.querySelector('.empty-item');
};
var moveRight = function moveRight() {
  var id = String(_store__WEBPACK_IMPORTED_MODULE_0__["default"].moveRight);
  var item = document.getElementById(id);
  item.classList.add('move-right');
  item.addEventListener('animationend', function () {
    item.classList.remove('move-right');
    delete _store__WEBPACK_IMPORTED_MODULE_0__["default"].moveRight;
  });
};
var moveLeft = function moveLeft() {
  var id = String(_store__WEBPACK_IMPORTED_MODULE_0__["default"].moveLeft);
  var item = document.getElementById(id);
  item.classList.add('move-left');
  item.addEventListener('animationend', function () {
    item.classList.remove('move-left');
    delete _store__WEBPACK_IMPORTED_MODULE_0__["default"].moveLeft;
  });
};
var moveUp = function moveUp() {
  var id = String(_store__WEBPACK_IMPORTED_MODULE_0__["default"].moveUp);
  var item = document.getElementById(id);
  item.classList.add('move-up');
  item.addEventListener('animationend', function () {
    item.classList.remove('move-up');
    delete _store__WEBPACK_IMPORTED_MODULE_0__["default"].moveUp;
  });
};
var moveDown = function moveDown() {
  var id = String(_store__WEBPACK_IMPORTED_MODULE_0__["default"].moveDown);
  var item = document.getElementById(id);
  item.classList.add('move-down');
  item.addEventListener('animationend', function () {
    item.classList.remove('move-down');
    delete _store__WEBPACK_IMPORTED_MODULE_0__["default"].moveDown;
  });
};
var setMove = function setMove() {
  var keys = Object.keys(_store__WEBPACK_IMPORTED_MODULE_0__["default"]);
  for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
    var key = _keys[_i];
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
var setSoundMove = function setSoundMove() {
  var audio = new Audio();
  audio.src = _public_assets_sound_schelchok_mp3__WEBPACK_IMPORTED_MODULE_1__;
  audio.autoplay = true;
};
var setDraggable = function setDraggable() {
  var empty = document.querySelector('.empty-item');
  var i = Number(empty.id[0]);
  var j = Number(empty.id[1]);
  if (j !== _store__WEBPACK_IMPORTED_MODULE_0__["default"].out.length - 1) {
    var id = String(i) + String(j + 1);
    document.getElementById(id).setAttribute('draggable', true);
    document.getElementById(id).style.cursor = 'move';
  }
  if (j !== 0) {
    var _id = String(i) + String(j - 1);
    document.getElementById(_id).setAttribute('draggable', true);
    document.getElementById(_id).style.cursor = 'move';
  }
  if (i !== _store__WEBPACK_IMPORTED_MODULE_0__["default"].out.length - 1) {
    var _id2 = String(i + 1) + String(j);
    document.getElementById(_id2).setAttribute('draggable', true);
    document.getElementById(_id2).style.cursor = 'move';
  }
  if (i !== 0) {
    var _id3 = String(i - 1) + String(j);
    document.getElementById(_id3).setAttribute('draggable', true);
    document.getElementById(_id3).style.cursor = 'move';
  }
};


/***/ }),

/***/ "./src/app/store.js":
/*!**************************!*\
  !*** ./src/app/store.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable no-param-reassign */
var store = {
  start: false,
  view: 4,
  countMove: 0,
  out: [],
  time: {
    sec: 0,
    min: 0
  },
  win: [{
    view: '4х4',
    countMove: 5,
    time: '1:20'
  }, {
    view: '5х5',
    countMove: 40,
    time: '2:30'
  }, {
    view: '6х6',
    countMove: 80,
    time: '10:15'
  }],
  initArray: function initArray() {
    var arr = [];
    for (var i = 1; i < Math.pow(this.view, 2); i++) {
      arr.push(i);
    }
    arr.push(0);
    for (var _i = 0; _i < this.view; _i++) {
      this.out.push(arr.splice(0, this.view));
    }
  },
  fillArray: function fillArray() {
    var arr = this.shuffle();
    for (var i = 0; i < this.view; i++) {
      this.out.push(arr.splice(0, this.view));
    }
  },
  swapPuzzle: function swapPuzzle(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] && arr[i + 1]) {
        var buf = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = buf;
        break;
      }
    }
  },
  countInverse: function countInverse(arr) {
    var inv = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        for (var j = 0; j < i; j++) {
          if (arr[j] > arr[i]) {
            inv += 1;
          }
        }
      }
    }
    return inv;
  },
  shuffle: function shuffle() {
    var temp = [];
    var shuffled = [];
    var inv = 0;
    var EmptyPazzleNumberLine = 0;
    for (var i = 0; i < Math.pow(this.view, 2); i++) {
      temp.push(i);
    }
    shuffled = temp.sort(function () {
      return 0.5 - Math.random();
    });
    inv = this.countInverse(shuffled);
    if (this.view % 2 === 0) {
      var shufledReverse = shuffled.reverse();
      for (var _i2 = 0; _i2 < shufledReverse.length; _i2++) {
        if (shufledReverse[_i2] === 0) {
          EmptyPazzleNumberLine = Math.trunc(_i2 / this.view) + 1;
        }
      }
      if (EmptyPazzleNumberLine % 2 === 0) {
        if (inv % 2 !== 0) return shuffled;
        this.swapPuzzle(shuffled);
        return shuffled;
      }
      if (EmptyPazzleNumberLine % 2 !== 0) {
        if (inv % 2 === 0) return shuffled;
        this.swapPuzzle(shuffled);
        return shuffled;
      }
    }
    if (inv % 2 === 0) return shuffled;
    this.swapPuzzle(shuffled);
    return shuffled;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);

/***/ }),

/***/ "./src/app/ui.js":
/*!***********************!*\
  !*** ./src/app/ui.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getFrameHtml": () => (/* binding */ getFrameHtml),
/* harmony export */   "getFrameSizeHtml": () => (/* binding */ getFrameSizeHtml),
/* harmony export */   "getModalHtml": () => (/* binding */ getModalHtml),
/* harmony export */   "getMoveHtml": () => (/* binding */ getMoveHtml),
/* harmony export */   "getStartHtml": () => (/* binding */ getStartHtml),
/* harmony export */   "getTimeHtml": () => (/* binding */ getTimeHtml),
/* harmony export */   "getWinnersHtml": () => (/* binding */ getWinnersHtml)
/* harmony export */ });
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ "./src/app/store.js");
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./check */ "./src/app/check.js");


var getFrameHtml = function getFrameHtml() {
  var html = '';
  for (var i = 0; i < _store__WEBPACK_IMPORTED_MODULE_0__["default"].view; i++) {
    var row = '';
    for (var j = 0; j < _store__WEBPACK_IMPORTED_MODULE_0__["default"].view; j++) {
      if (_store__WEBPACK_IMPORTED_MODULE_0__["default"].out[i][j] === 0) {
        _store__WEBPACK_IMPORTED_MODULE_0__["default"].out[i][j] = ' ';
      }
      row += "<div class='frame-item' id='".concat(i).concat(j, "'>").concat(_store__WEBPACK_IMPORTED_MODULE_0__["default"].out[i][j], "</div>");
    }
    html += "<div class='frame-row'>".concat(row, "</div>");
  }
  return html;
};
function getFrameSizeHtml() {
  var size = _store__WEBPACK_IMPORTED_MODULE_0__["default"].view;
  if ((0,_check__WEBPACK_IMPORTED_MODULE_1__.checkSaveGame)()) {
    var saveStore = JSON.parse(localStorage.store);
    size = saveStore.view;
  }
  return "\n<span class='frame-current-size text'> Frame size: ".concat(size, "\u0445").concat(size, "</span>");
}
var getMoveHtml = function getMoveHtml() {
  var count = _store__WEBPACK_IMPORTED_MODULE_0__["default"].countMove;
  if ((0,_check__WEBPACK_IMPORTED_MODULE_1__.checkSaveGame)()) {
    var saveStore = JSON.parse(localStorage.store);
    count = saveStore.countMove;
  }
  return "\n  <span class='count-move'>Move: ".concat(count, "</span>\n  ");
};
var getTimeHtml = function getTimeHtml() {
  var sec = _store__WEBPACK_IMPORTED_MODULE_0__["default"].time.sec;
  var min = _store__WEBPACK_IMPORTED_MODULE_0__["default"].time.min;
  if ((0,_check__WEBPACK_IMPORTED_MODULE_1__.checkSaveGame)()) {
    var saveStore = JSON.parse(localStorage.store);
    sec = saveStore.time.sec;
    min = saveStore.time.min;
  }
  return "\n  <span class='count-time'>  Time: <span id='min' class='count-time'>".concat(min, "</span>:<span id='sec' class='count-time'>").concat(sec, "</span></span>\n  ");
};
var getModalHtml = function getModalHtml() {
  return "\n  <div class='modal-wrapper'>\n    <div class='modal-content'>\n        <div class='modal-win'>\n            You win!\n        </div>\n        <div class='modal-move'>\n            ".concat(getMoveHtml(), "\n        </div>\n        <div class='modal-time'>\n            ").concat(getTimeHtml(), "\n        </div>\n    </div>\n  </div>\n  ");
};
var getWinnersHtml = function getWinnersHtml() {
  var html = "\n  <caption>Victory table</caption>\n      <tr>\n          <th>Size</th>\n          <th>Move</th>\n          <th>Time</th>\n      </tr>\n  ";
  for (var i = 0; i < _store__WEBPACK_IMPORTED_MODULE_0__["default"].win.length; i++) {
    html += "\n    <tr>\n        <td>".concat(_store__WEBPACK_IMPORTED_MODULE_0__["default"].win[i].view, "</td>\n        <td>").concat(_store__WEBPACK_IMPORTED_MODULE_0__["default"].win[i].countMove, "</td>\n        <td>").concat(_store__WEBPACK_IMPORTED_MODULE_0__["default"].win[i].time, "</td>\n    </tr>");
  }
  return html;
};
var getWinHtml = function getWinHtml() {
  return "\n<div class='winnner'>\n  <table class =\"winner-content\">\n  </table>\n  <div>\n  <button class='winners-close-btn'>Close</button>\n  </div>\n</div>";
};
function getStartHtml() {
  return "\n   <div class='wrapper'>\n      <div class='content'>\n          <div class='menu'>\n              <button id = 'shuffle-btn' class='menu-btn'>Shufle and start</button>\n              <button id = 'stop-btn'class='menu-btn'>Stop</button>\n              <button id = 'save-btn'class='menu-btn'>Save</button>\n              <button id = 'result-btn' class='menu-btn'>Result</button>\n          </div>\n          <div class='info'>\n              <span class='info-move text'>".concat(getMoveHtml(), "</span>\n              <span class='info-time text'>").concat(getTimeHtml(), "</span>\n          </div>\n          <div class='wrapper-frame'>\n          <div class='frame'>\n              ").concat(getFrameHtml(), "\n          </div>\n          </div>\n          <div class='frame-current'>\n              ").concat(getFrameSizeHtml(), "\n          </div>\n          <span class='frame-size-tex text'>Other size:</span>\n          <div class='frame-all'>\n            <button class='frame-size'>3\u04453</button>\n            <button class='frame-size active-size-frame'>4\u04454</button>\n            <button class='frame-size'>5\u04455</button>\n            <button class='frame-size'>6\u04456</button>\n            <button class='frame-size'>7\u04457</button>\n            <button class='frame-size'>8\u04458</button>\n          </div>\n      </div>\n  </div>\n  ").concat(getModalHtml(), "\n  ").concat(getWinHtml());
}


/***/ }),

/***/ "./src/app/utils.js":
/*!**************************!*\
  !*** ./src/app/utils.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTime": () => (/* binding */ getTime),
/* harmony export */   "hide": () => (/* binding */ hide),
/* harmony export */   "show": () => (/* binding */ show)
/* harmony export */ });
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ "./src/app/store.js");
/* harmony import */ var _check__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./check */ "./src/app/check.js");



/* eslint-disable no-param-reassign */
var hide = function hide(element) {
  element.style = 'display:none';
};
var show = function show(element) {
  element.style = 'display:flex';
};
var getTime = function getTime() {
  function tick() {
    if ((0,_check__WEBPACK_IMPORTED_MODULE_1__.checkSaveGame)()) {
      var saveStore = JSON.parse(localStorage.store);
      _store__WEBPACK_IMPORTED_MODULE_0__["default"].time.sec = saveStore.time.sec;
      _store__WEBPACK_IMPORTED_MODULE_0__["default"].time.min = saveStore.time.min;
    }
    _store__WEBPACK_IMPORTED_MODULE_0__["default"].time.sec += 1;
    _store__WEBPACK_IMPORTED_MODULE_0__["default"].time.min += Math.floor(_store__WEBPACK_IMPORTED_MODULE_0__["default"].time.sec / 60);
    if (_store__WEBPACK_IMPORTED_MODULE_0__["default"].time.sec > 59) {
      _store__WEBPACK_IMPORTED_MODULE_0__["default"].time.sec = 0;
    }
    document.getElementById('sec').childNodes[0].nodeValue = _store__WEBPACK_IMPORTED_MODULE_0__["default"].time.sec;
    document.getElementById('min').childNodes[0].nodeValue = _store__WEBPACK_IMPORTED_MODULE_0__["default"].time.min;
  }
  var timerId = setInterval(tick, 1000);
  document.addEventListener('click', function (event) {
    if (event.target.closest('#stop-btn')) {
      clearInterval(timerId);
      _store__WEBPACK_IMPORTED_MODULE_0__["default"].time.sec = document.getElementById('sec').childNodes[0].nodeValue;
      _store__WEBPACK_IMPORTED_MODULE_0__["default"].time.min = document.getElementById('min').childNodes[0].nodeValue;
    }
  });
  document.addEventListener('click', function (event) {
    if (event.target.closest('.frame-size')) {
      clearInterval(timerId);
      // store.time.sec = 0;
      // store.time.min = 0;
    }
  });
};



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/app.scss":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/app.scss ***!
  \*********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../public/assets/img/bharath-g-s-aLGiPJ4XRO4-unsplash.jpg */ "./src/public/assets/img/bharath-g-s-aLGiPJ4XRO4-unsplash.jpg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../public/assets/img/cesar-couto-TIvFLeqZ4ec-unsplash.jpg */ "./src/public/assets/img/cesar-couto-TIvFLeqZ4ec-unsplash.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".wrapper {\n  display: flex;\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  justify-content: center;\n  align-items: center;\n  overflow: auto;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover; }\n\n.wrapper-frame {\n  display: flex;\n  justify-content: center;\n  align-items: center; }\n\n.frame {\n  width: 500px;\n  height: 500px;\n  border: 10px solid greenyellow;\n  border-radius: 5px;\n  box-sizing: border-box;\n  margin-top: 10px;\n  margin-bottom: 10px; }\n  @media screen and (max-width: 1280px) {\n    .frame {\n      width: 400px;\n      height: 400px; } }\n  @media screen and (max-width: 768px) {\n    .frame {\n      width: 300px;\n      height: 300px; } }\n\n.frame-row {\n  position: relative;\n  display: flex;\n  flex-direction: row;\n  height: 25%; }\n\n.frame-item {\n  position: relative;\n  display: flex;\n  z-index: 99;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.5rem;\n  width: 25%;\n  margin: 1px;\n  border: 2px solid greenyellow;\n  border-radius: 10px;\n  background-color: goldenrod;\n  box-sizing: border-box;\n  transition: left 2s; }\n  .frame-item:hover {\n    cursor: pointer;\n    background-color: aquamarine;\n    transform: scale(1.01); }\n\n.frame-size:hover {\n  cursor: pointer; }\n\n.active-size-frame {\n  color: green; }\n\n.frame-all {\n  display: flex;\n  justify-content: center; }\n\n.empty-item {\n  background-color: white;\n  opacity: .001;\n  border: 0; }\n\n.active-dropzone {\n  background-color: orange;\n  opacity: 1; }\n\n.move-down {\n  animation: to-down .2s; }\n\n.move-up {\n  animation: to-up .2s; }\n\n.move-left {\n  animation: to-left .2s; }\n\n.move-right {\n  animation: to-right .2s; }\n\n@keyframes to-down {\n  from {\n    top: -100%; }\n  to {\n    top: 0; } }\n\n@keyframes to-up {\n  from {\n    bottom: -100%; }\n  to {\n    bottom: 0; } }\n\n@keyframes to-left {\n  from {\n    right: -50px; }\n  to {\n    right: 0px; } }\n\n@keyframes to-right {\n  from {\n    left: -50px; }\n  to {\n    left: 0px; } }\n\n.modal-wrapper {\n  display: none;\n  position: fixed;\n  align-items: center;\n  justify-content: center;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  background-size: cover; }\n\nbody {\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover; }\n\n.modal-content {\n  font-size: 3rem;\n  font-weight: bold;\n  font-family: Verdana, Geneva, Tahoma, sans-serif; }\n\n.countMove {\n  width: 50px; }\n\n.winnner {\n  display: none;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column; }\n\ntable {\n  width: 80%;\n  border-collapse: collapse;\n  margin: 10px; }\n\ntd, tr, caption {\n  padding: 3px;\n  border: 3px solid green;\n  text-align: center; }\n\n.menu-btn {\n  background-color: aquamarine;\n  border: 0;\n  border-radius: 5px;\n  font-size: 1rem;\n  padding: 5px;\n  margin-right: 10px; }\n  .menu-btn:hover {\n    cursor: pointer;\n    background-color: aqua; }\n\n.frame-size {\n  background-color: aquamarine;\n  border: 0;\n  border-radius: 5px;\n  font-size: 1rem;\n  padding: 5px;\n  margin-right: 10px; }\n  .frame-size:hover {\n    cursor: pointer;\n    background-color: aqua; }\n\n.menu {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  margin-bottom: 10px; }\n\n.info {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between; }\n\n.count-move {\n  font-size: 1rem; }\n\n.count-time {\n  font-size: 1rem; }\n\n.frame-all {\n  margin-top: 10px; }\n\n.text {\n  font-size: 1rem;\n  font-weight: bold;\n  font-family: Verdana, Geneva, Tahoma, sans-serif; }\n", "",{"version":3,"sources":["webpack://./src/style/layout/_wrapper.scss","webpack://./src/style/base/_frame.scss","webpack://./src/style/base/_modal.scss","webpack://./src/style/base/_input.scss","webpack://./src/style/base/_winners.scss","webpack://./src/style/base/_button.scss","webpack://./src/style/base/_menu.scss","webpack://./src/style/base/_info.scss"],"names":[],"mappings":"AAAA;EACG,aAAa;EACb,eAAe;EACf,WAAW;EACX,YAAY;EACZ,OAAM;EACN,MAAK;EACL,uBAAuB;EACvB,mBAAmB;EACnB,cAAc;EACd,yDAAgF;EAChF,sBAAsB,EAAA;;ACXzB;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB,EAAA;;AAErB;EACI,YAAW;EACX,aAAY;EACZ,8BAA8B;EAC9B,kBAAkB;EAClB,sBAAsB;EACtB,gBAAgB;EAChB,mBAAmB,EAAA;EACnB;IARJ;MASM,YAAW;MACX,aAAY,EAAA,EAOjB;EALG;IAZJ;MAaQ,YAAW;MACX,aAAY,EAAA,EAGnB;;AACD;EACI,kBAAkB;EAClB,aAAa;EACb,mBAAmB;EACnB,WAAW,EAAA;;AAEf;EACI,kBAAkB;EAClB,aAAa;EACb,WAAW;EACX,mBAAmB;EACnB,uBAAuB;EACvB,iBAAiB;EACjB,UAAU;EACV,WAAW;EACX,6BAA6B;EAC7B,mBAAmB;EACnB,2BAA0B;EAC1B,sBAAsB;EACtB,mBAAmB,EAAA;EAbvB;IAeQ,eAAe;IACf,4BAA4B;IAC5B,sBAAsB,EAAA;;AAG9B;EAEQ,eAAe,EAAA;;AAGvB;EACI,YAAY,EAAA;;AAEhB;EACE,aAAa;EACb,uBAAuB,EAAA;;AAGzB;EACI,uBAAuB;EACvB,aAAa;EACb,SAAS,EAAA;;AAEb;EACI,wBAAwB;EACxB,UAAU,EAAA;;AAEd;EACI,sBAAsB,EAAA;;AAE1B;EACI,oBAAoB,EAAA;;AAExB;EACI,sBAAsB,EAAA;;AAE1B;EACI,uBAAuB,EAAA;;AAG3B;EACI;IACI,UAAW,EAAA;EAEb;IACE,MAAM,EAAA,EAAA;;AAGd;EACI;IACI,aAAY,EAAA;EAEZ;IACA,SAAS,EAAA,EAAA;;AAGjB;EACI;IACI,YAAW,EAAA;EAEX;IACA,UAAU,EAAA,EAAA;;AAGlB;EACI;IACI,WAAW,EAAA;EAEX;IACA,SAAS,EAAA,EAAA;;ACjHjB;EACI,aAAa;EACb,eAAe;EACf,mBAAmB;EACnB,uBAAuB;EACvB,OAAO;EACP,MAAK;EACL,WAAW;EACX,YAAY;EACZ,yDAAgF;EAChF,sBAAsB,EAAA;;AAE1B;EACE,yDAAgF;EAChF,sBAAsB,EAAA;;AAGxB;EACE,eAAe;EACf,iBAAiB;EACjB,gDAAgD,EAAA;;ACpBlD;EACI,WAAW,EAAA;;ACDf;EACI,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,sBAAsB,EAAA;;AAE1B;EACE,UAAU;EACV,yBAAyB;EACzB,YAAY,EAAA;;AAEd;EACE,YAAY;EACZ,uBAAuB;EACvB,kBAAkB,EAAA;;ACdpB;EACI,4BAA4B;EAC5B,SAAS;EACT,kBAAkB;EAClB,eAAe;EACf,YAAY;EACZ,kBAAkB,EAAA;EANtB;IASQ,eAAe;IACf,sBAAsB,EAAA;;AAI9B;EACE,4BAA4B;EAC5B,SAAS;EACT,kBAAkB;EAClB,eAAe;EACf,YAAY;EACZ,kBAAkB,EAAA;EANpB;IASM,eAAe;IACf,sBAAsB,EAAA;;ACxB5B;EACI,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,mBAAmB,EAAA;;ACJvB;EACI,aAAa;EACb,mBAAmB;EACnB,8BAA8B,EAAA;;AAElC;EACI,eAAe,EAAA;;AAEnB;EACI,eAAe,EAAA;;AAGnB;EACE,gBAAgB,EAAA;;AAElB;EACE,eAAe;EACf,iBAAiB;EACjB,gDAAgD,EAAA","sourcesContent":[".wrapper {\n   display: flex;\n   position: fixed;\n   width: 100%;\n   height: 100%;\n   left:0;\n   top:0;\n   justify-content: center;\n   align-items: center;\n   overflow: auto;\n   background-image: url(../public/assets/img/bharath-g-s-aLGiPJ4XRO4-unsplash.jpg);\n   background-size: cover;\n}\n\n",".wrapper-frame {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n.frame {\r\n    width:500px;\r\n    height:500px;\r\n    border: 10px solid greenyellow;\r\n    border-radius: 5px;\r\n    box-sizing: border-box;\r\n    margin-top: 10px;\r\n    margin-bottom: 10px;\r\n    @media screen and (max-width: 1280px) {\r\n      width:400px;\r\n      height:400px;\r\n    }\r\n    @media screen and (max-width: 768px) {\r\n        width:300px;\r\n        height:300px;\r\n      }\r\n\r\n}\r\n.frame-row {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: row;\r\n    height: 25%;\r\n}\r\n.frame-item {\r\n    position: relative;\r\n    display: flex;\r\n    z-index: 99;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 1.5rem;\r\n    width: 25%;\r\n    margin: 1px;\r\n    border: 2px solid greenyellow;\r\n    border-radius: 10px;\r\n    background-color:goldenrod;\r\n    box-sizing: border-box;\r\n    transition: left 2s;\r\n    &:hover {\r\n        cursor: pointer;\r\n        background-color: aquamarine;\r\n        transform: scale(1.01);\r\n    }\r\n}\r\n.frame-size {\r\n        &:hover {\r\n        cursor: pointer;\r\n    }\r\n}\r\n.active-size-frame {\r\n    color: green;\r\n}\r\n.frame-all {\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.empty-item {\r\n    background-color: white;\r\n    opacity: .001;\r\n    border: 0;\r\n}\r\n.active-dropzone {\r\n    background-color: orange;\r\n    opacity: 1;\r\n}\r\n.move-down {\r\n    animation: to-down .2s;\r\n}\r\n.move-up {\r\n    animation: to-up .2s;\r\n}\r\n.move-left {\r\n    animation: to-left .2s;\r\n}\r\n.move-right {\r\n    animation: to-right .2s;\r\n}\r\n\r\n@keyframes to-down{\r\n    from {\r\n        top : -100%;\r\n      }\r\n      to {\r\n        top: 0;\r\n      }\r\n    }\r\n@keyframes to-up{\r\n    from {\r\n        bottom:-100%;\r\n        }\r\n        to {\r\n        bottom: 0;\r\n        }\r\n    }\r\n@keyframes to-left{\r\n    from {\r\n        right:-50px;\r\n        }\r\n        to {\r\n        right: 0px;\r\n        }\r\n    }\r\n@keyframes to-right{\r\n    from {\r\n        left :-50px;\r\n        }\r\n        to {\r\n        left: 0px;\r\n        }\r\n    }\r\n",".modal-wrapper {\n    display: none;\n    position: fixed;\n    align-items: center;\n    justify-content: center;\n    left: 0;\n    top:0;\n    width: 100%;\n    height: 100%;\n    background-image: url(../public/assets/img/cesar-couto-TIvFLeqZ4ec-unsplash.jpg);\n    background-size: cover;\n}\nbody {\n  background-image: url(../public/assets/img/bharath-g-s-aLGiPJ4XRO4-unsplash.jpg);\n  background-size: cover;\n}\n\n.modal-content{\n  font-size: 3rem;\n  font-weight: bold;\n  font-family: Verdana, Geneva, Tahoma, sans-serif;\n  }\n",".countMove {\n    width: 50px;\n}",".winnner {\n    display: none;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n}\ntable {\n  width: 80%;\n  border-collapse: collapse;\n  margin: 10px;\n}\ntd, tr, caption {\n  padding: 3px;\n  border: 3px solid green;\n  text-align: center;\n}\n",".menu-btn{\n    background-color: aquamarine;\n    border: 0;\n    border-radius: 5px;\n    font-size: 1rem;\n    padding: 5px;\n    margin-right: 10px;\n\n    &:hover {\n        cursor: pointer;\n        background-color: aqua;\n    }\n\n}\n.frame-size {\n  background-color: aquamarine;\n  border: 0;\n  border-radius: 5px;\n  font-size: 1rem;\n  padding: 5px;\n  margin-right: 10px;\n\n  &:hover {\n      cursor: pointer;\n      background-color: aqua;\n  }\n\n}\n",".menu {\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    margin-bottom: 10px;\n}\n",".info {\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: space-between;\r\n}\r\n.count-move {\r\n    font-size: 1rem;\r\n}\r\n.count-time {\r\n    font-size: 1rem;\r\n}\r\n\r\n.frame-all {\r\n  margin-top: 10px;\r\n}\r\n.text {\r\n  font-size: 1rem;\r\n  font-weight: bold;\r\n  font-family: Verdana, Geneva, Tahoma, sans-serif;\r\n\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style/app.scss":
/*!****************************!*\
  !*** ./src/style/app.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_app_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./app.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style/app.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_app_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_app_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_app_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_app_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/public/assets/img/bharath-g-s-aLGiPJ4XRO4-unsplash.jpg":
/*!********************************************************************!*\
  !*** ./src/public/assets/img/bharath-g-s-aLGiPJ4XRO4-unsplash.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/b311278c5eeb6bbf67c1.jpg";

/***/ }),

/***/ "./src/public/assets/img/cesar-couto-TIvFLeqZ4ec-unsplash.jpg":
/*!********************************************************************!*\
  !*** ./src/public/assets/img/cesar-couto-TIvFLeqZ4ec-unsplash.jpg ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/0385f84d7fc8363966f5.jpg";

/***/ }),

/***/ "./src/public/assets/sound/schelchok.mp3":
/*!***********************************************!*\
  !*** ./src/public/assets/sound/schelchok.mp3 ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/f9174e55b389295c143e.mp3";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/app/index.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style/app.scss */ "./src/style/app.scss");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/app/render.js");
/* harmony import */ var _listen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listen */ "./src/app/listen.js");



(0,_render__WEBPACK_IMPORTED_MODULE_1__.render)();
(0,_listen__WEBPACK_IMPORTED_MODULE_2__.listenChangeFrameSize)();
(0,_listen__WEBPACK_IMPORTED_MODULE_2__.listenMoveItem)();
(0,_listen__WEBPACK_IMPORTED_MODULE_2__.listenCloseModal)();
(0,_listen__WEBPACK_IMPORTED_MODULE_2__.listenShuffle)();
(0,_listen__WEBPACK_IMPORTED_MODULE_2__.listenSave)();
(0,_listen__WEBPACK_IMPORTED_MODULE_2__.listenResult)();
(0,_listen__WEBPACK_IMPORTED_MODULE_2__.listenCloseWinners)();
(0,_listen__WEBPACK_IMPORTED_MODULE_2__.listenDrag)();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map