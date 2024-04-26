let str = "2017-09-13";
let reg = /(\d+)(-)/g;

str.replace(reg, ($0, $1, $2) => {
  // console.log($0)
  // console.log($1)
  // console.log($2)
});

let str1 = "$1,187,098.";
//  $18,935,785

let reg1 = /^\$(0|([1-9]\d{0,2}(,\d{3})*))(\.\d{2})?$/g;
// console.log(reg1.test(str1))

// 1、密码校验  需要包含大写字母、小写字母、数字、特殊字符
const pswReg =
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[~!@#$%^&*<>?,.])[\dA-Za-z~!@#$%^&*<>?,.]{8,16}$/g;

// 2、将数字10000000000，分割为10,000,000,000
const getNewStr = (str) => {
  const reg = /\B(?=(\d{3})+(?!\d))/g;
  return str.replace(reg, ",");
};
// console.log(getNewStr("1000000000009999"));

// 3、去除首位空格
const deleteSpace = (str) => {
  // 方案1
  return str.replace(/^\s*(\S.*\S+)\s*$/, ($0, $1) => $1);

  // 方案2
  //   return str.replace(/^\s*|\s*$/g, "");
};
// console.log(deleteSpace("   LI   DAN     "));
