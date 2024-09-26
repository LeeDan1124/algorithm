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
    // html标签正则表达reg
    const reg = /<(\w+)\s*([^>]*)>/;

    let ast = {};
    // 匹配到的结果
    const result = reg.exec(htmlStr);

    if(result) {
        // 标签名
        const tagName = result[1];
        // 属性
        const attrs = result[2];

        // 标签名
        ast = {
            tag: tagName,
            attr: getAttr(attrs),
            children: []
        };
    }
    return ast
}


function getAttr(attrs) {
    const reg = /(\w+)="([^"]*)"/;
    const result = reg.exec(attrs);
    while(result) {
        const attrName = result[1];
        const attrValue = result[2];
        attrs[attrName] = attrValue;
        result = reg.exec(attrs);
    }
    return attrs;
}

console.log(parseHtml(htmlStr));