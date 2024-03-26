console.log(1);

Promise.resolve()
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);
  });

setTimeout(() => {
  console.log("t1");
}, 0);
async function bar() {
  await boo();
  console.log(5);
}
bar();

async function foo() {
  try {
    await Promise.reject(6)
    .catch((e) => {
      console.log(11, "-");
      console.log(e);
      console.log(12, "-");
    });
  } 
  catch (e) {
    console.log(11);
    console.log(e);
    console.log(12);
  }
  console.log(7);
  setTimeout(() => {
    console.log("t2");
  }, 0);
  return Promise.resolve("b");
}

foo().then(() => {
  console.log(8);
});

Promise.resolve().then(() => {
  console.log(13);
});

function boo() {
  console.log(9);
}
console.log(10);

/** */
// 当23行有catch时：   1 9 10 3 5 11- 6 12- 13 4 7 8 t1 t2
// 当23行没有catch时   1 9 10 3 5 13  4 11  6 12 7 8 t1 t2
