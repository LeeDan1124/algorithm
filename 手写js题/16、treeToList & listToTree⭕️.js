// https://juejin.cn/post/6952442048708345863

const listData = [
  {
    id: "p1",
    title: "广东",
  },
  {
    id: "p1-1",
    pid: "p1",
    title: "广州",
  },
  {
    id: "p2",
    title: "四川",
  },
  {
    id: "p2-1",
    pid: "p2",
    title: "成都",
  },
  {
    id: "p2-2",
    pid: "p2",
    title: "德阳",
  },
  {
    id: "p2-3",
    pid: "p2",
    title: "绵阳",
  },
  {
    id: "p2-1-1",
    pid: "p2-1",
    title: "高新区",
  },
];

const treeData = [
  {
    id: "p1",
    title: "广东",
    children: [
      {
        id: "p1-1",
        title: "广州",
      },
    ],
  },
  {
    id: "p2",
    title: "四川",
    children: [
      {
        id: "p2-1",
        title: "成都",
        children: [
          {
            id: "p2-1-1",
            title: "高新区",
          },
        ],
      },
      {
        id: "p2-2",
        title: "德阳",
      },
      {
        id: "p2-3",
        title: "绵阳",
      },
    ],
  },
];

// 数组转树🌲
const transArrToTree = (arr) => {
  if (!Array.isArray(arr)) {
    return Error("请输入数组");
  }

  for (let i = 0; i <= arr.length - 1; i++) {
    const { id, children } = arr[i];
    const _children = Array.isArray(children) ? children : [];

    for (let j = i + 1; j <= arr.length - 1; j++) {
      const { pid } = arr[j];

      if (pid === id) {
        _children.push(arr[j]);
      }
    }

    if (!!_children.length) {
      arr[i].children = _children;
    }
  }
  return arr.filter((i) => !i.pid);
};
// console.log(JSON.stringify(transArrToTree(listData)));

// 🌴树转数组
const treeToArr = (tree) => {
  if (!Array.isArray(tree)) {
    return Error("请输入一个数组");
  }

  const list = [];

  const inner = (tree1, pid) => {
    for (let node of tree1) {
      const { children, id, title } = node;
      if (!!children) {
        list.push({
          id,
          title,
          pid,
        });
        inner(children, id);
      } else {
        list.push({ ...node, pid });
      }
    }
  };
  inner(tree);

  return list;
};
console.log(JSON.stringify(treeToArr(treeData)));
