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
    const temp = [];
    for (let i = 0; i < this.view ** 2; i++) {
      temp.push(i);
    }
    const shuffled = temp.sort(() => 0.5 - Math.random());
    for (let i = 0; i < this.view; i++) {
      this.out.push(shuffled.splice(0, this.view));
    }
  },
};
export default store;
