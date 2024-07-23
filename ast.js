/*
 实现一个AST解析方法，解析下列html输入，输出对应树形结构（区分标签、属性、内容等）,并输出对应的AST结构：
 {
    tag: 'div',
    attr: {
        class: 'home home_SH__b7t5_',
        id: '22',
        style: 'width:22px; height: 22px'
    },
    children: [
        {
            tag: 'span',
            attr: {
                class:'dd',
            },
            children: shibiedaolema
        }
    ]
}
*/
const htmlStr = `
    <div class="home home_SH__b7t5_" id='22' style='width:22px; height: 22px'>
        <span class='dd'>shibiedaolema</span>
    </div>`;

function parseHtml(htmlStr) {
  // 匹配html标签的正则
  // const htmlReg = /<([a-zA-Z]+)(\n*\s*[^>]*)>(.*)<\/\1>/gm
  // const htmlReg = /<([a-zA-Z]+)(\n*\s*[^>]*)>(?:.*?<\/\1>)*.*?<\/\1>/gm

  const htmlReg = /\s*\n*<([a-zA-Z]+)(\n*\s*[^>]*)>([\s\S]*?(?:(?!<\/\1>)<[\s\S]*?>[\s\S]*?)*[\s\S]*?)<\/\1>/gm
  let ast = {};
  let match = htmlReg.exec(htmlStr);

  if (!match) {
    return htmlStr;
  }

  while (match) {
    ast = {
      tag: match[1],
      attr: parseAttr(match[2]),
      children: parseHtml(match[3]),
    };
    match = htmlReg.exec(htmlStr);
  }
  return ast;
}

function parseAttr(attrs) {
  const attrObj = {};
  const attrReg = /\s*([a-zA-Z]+)=["'](.*?)["']\s*/gm;
  let match = attrReg.exec(attrs);
  while (match) {
    attrObj[match[1]] = match[2];
    match = attrReg.exec(attrs);
  }
  return attrObj;
}

// console.log(parseHtml(htmlStr));


























// function parseHtml(htmlStr) {
//   // 这个正则只能标识某一个html标签，但是识别不了嵌套标签，帮我完善一下
//   // const htmlReg = /<([a-zA-Z]+)(\n*\s*[^>]*)>(.*)<\/\1>/gm;
//   const htmlReg = /\s*\n*<([a-zA-Z]+)(\n*\s*[^>]*)>([\s\S]*?(?:(?!<\/\1>)<[\s\S]*?>[\s\S]*?)*[\s\S]*?)<\/\1>/gm;
//   let ast = {};
//   let match = htmlReg.exec(htmlStr);

//   if (match) {
//     ast = {
//       tag: match[1],
//       attr: parseAttr(match[2]),
//       children: parseHtml(match[3]),
//     };
//   } else {
//     return htmlStr
//   }
//   return ast;
// }

// function parseAttr(attrStr) {
//   const attrObj = {};
//   const attrReg = /\s*([a-zA-Z]+)=["'](.*?)["']\s*/gm;
//   let match = attrReg.exec(attrStr);
//   while (match) {
//     attrObj[match[1]] = match[2];
//     match = attrReg.exec(attrStr);
//   }
//   return attrObj;
// }

// console.log(parseHtml(htmlStr));


// ---
const obj = {
  a: 1,
  b: 2
}

function add(num1, num2) {
  console.log('🦴', num1, num2)
  return num1 + num2
}

add(...obj)
// const obj1 = {
//   c: 3,
//   ...obj
// }
// console.log('👩‍👩‍👦', obj1)