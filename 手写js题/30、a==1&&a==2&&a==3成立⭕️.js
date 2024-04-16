const a = {
  count: 1,
  valueOf() {
    return this.count++;
  },
};

console.log(a == 1 && a == 2 && a == 3);
