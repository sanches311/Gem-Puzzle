/* eslint-disable no-param-reassign */
const store = {
  view: 4,
  countMove: 0,
  out: [],
  time: {
    sec: 0,
    min: 0,
  },
  win: [
    {
      view: '4х4',
      countMove: 5,
      time: '1:20',
    },
    {
      view: '5х5',
      countMove: 40,
      time: '2:30',
    },
    {
      view: '6х6',
      countMove: 80,
      time: '10:15',
    },
  ],
  fillArray() {
    const arr = this.shuffle();
    for (let i = 0; i < this.view; i++) {
      this.out.push(arr.splice(0, this.view));
    }
  },
  swapPuzzle(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] && arr[i + 1]) {
        const buf = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = buf;
        break;
      }
    }
  },
  countInverse(arr) {
    let inv = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]) {
        for (let j = 0; j < i; j++) {
          if (arr[j] > arr[i]) {
            inv += 1;
          }
        }
      }
    }
    return inv;
  },
  shuffle() {
    const temp = [];
    let shuffled = [];
    let inv = 0;
    let EmptyPazzleNumberLine = 0;
    for (let i = 0; i < this.view ** 2; i++) {
      temp.push(i);
    }
    shuffled = temp.sort(() => 0.5 - Math.random());
    inv = this.countInverse(shuffled);
    if (this.view % 2 === 0) {
      const shufledReverse = shuffled.reverse();
      for (let i = 0; i < shufledReverse.length; i++) {
        if (shufledReverse[i] === 0) {
          EmptyPazzleNumberLine = Math.trunc(i / this.view) + 1;
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
  },
};
export default store;
