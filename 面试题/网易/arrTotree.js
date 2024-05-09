const arr = [
  { id: 1, name: "组织1", parentid: 0 },
  { id: 2, name: "组织2", parentid: 1 },
  { id: 3, name: "组织3", parentid: 1 },
  { id: 4, name: "组织4", parentid: 3 },
  { id: 5, name: "组织5", parentid: 4 },
];

// 转成
[
  {
    id: 1,
    name: "组织1",
    parentid: 0,
    children: [
      {
        id: 2,
        name: "组织2",
        parentid: 1,
        children: [],
      },
      {
        id: 3,
        name: "组织3",
        parentid: 1,
        children: [],
      },
    ],
  },
];

function arrToTree(arr) {
  if (!Array.isArray(arr) || !arr.length) return;

  // 要在arr上直接操作，不要使用额外的数组，我靠！！！！！！
  // const tree = [];
  const childIds = [];
  function inner(arr, pid) {
    const children = [];
    for (let j = 0; j < arr.length; j++) {
      const { parentid: curPId, id } = arr[j];
      if (curPId === pid) {
        childIds.push(id);
        children.push(arr[j]);
      }
    }
    return children;
  }

  for (let i = 0; i < arr.length; i++) {
    const { id } = arr[i];
    const children = inner(arr.slice(i + 1), id);

    // tree.push({
    //   ...arr[i],
    //   children,
    // });
    arr[i].children = children;
  }
  return arr.filter((i) => !childIds.includes(i.id));
}

console.log(JSON.stringify(arrToTree(arr)));
[
  {
    id: 1,
    name: "组织1",
    parentid: 0,
    children: [
      { id: 2, name: "组织2", parentid: 1, children: [] },
      {
        id: 3,
        name: "组织3",
        parentid: 1,
        children: [
          {
            id: 4,
            name: "组织4",
            parentid: 3,
            children: [{ id: 5, name: "组织5", parentid: 4, children: [] }],
          },
        ],
      },
    ],
  },
];
