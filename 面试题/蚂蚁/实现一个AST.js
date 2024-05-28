// 题目：实现一个AST解析方法，解析下列输入，输出对应树形结构（区分标签、属性、内容等）
const htmlStr = `<div class="home home_SH__b7t5_" id='22' style='width:22px; height: 22px'><div class="home_stockType__NO1wN"><span class="stockCode" id='2'>SH</span><span class="stockTicker" id='3'>601111</span></div></div>`
// const htmlStr = `
//     <div class="home home_SH__b7t5_" id='22' style='width:22px; height: 22px'>
//         <div class="home_stockType__NO1wN">
//             <span class="stockCode" id='2'>SH</span>
//             <span class="stockTicker" id='3'>601111</span>
//         </div>
// </div>`

const getHtmlAst = (htmlStr) => {

    if (!htmlStr) return

    const astTree = {}

    const flagReg = /<(\w+)\b([^>]*)>(.*)(<\/\1>)/gm

    while (flagReg.lastIndex < htmlStr.length) {
        const curTag = flagReg.exec(htmlStr)
        // console.log('🦸', curTag)

        // 文本类型的children
        if (!curTag) return htmlStr

        const flagKey = curTag[1]
        const attrs = curTag[2]
        const child = curTag[3]

        // 拼装属性
        const props = {}
        const attrReg = /(\w+)=["|']([^'"]*)["|'][\r\n]*/g
        while (attrReg.lastIndex < attrs.length) {
            const attr = attrReg.exec(attrs)
            const attrKey = attr[1]
            const attrVal = attr[2]
            props[attrKey] = attrVal
        }

        const children = getHtmlAst(child)

        astTree[flagKey] = {
            tag: flagKey,
            props: props,
            children: children
        }
    }

    console.log('👤', JSON.stringify(astTree))
    return astTree
}
// getHtmlAst(htmlStr)

function parseHTML(htmlStr) {
    const stack = [];
    let currentNode = null;
    let tagOpen = false;
    let tagName = '';
    let attrs = {};
    let content = '';

    function startTag(tagName, attrs) {
        const newNode = { type: tagName, attrs, children: [] };
        if (currentNode) {
            currentNode.children.push(newNode);
        } else {
            stack.push(newNode);
        }
        currentNode = newNode;
    }

    function endTag(tagName) {
        if (currentNode && currentNode.type === tagName) {
            currentNode = stack.pop();
        }
    }

    function parseAttrs(attrStr) {
        const attrs = {};
        const attrPairs = attrStr.split(/\s+/);
        for (let i = 0; i < attrPairs.length; i++) {
            const [key, value] = attrPairs[i].split('=');
            if (value) {
                attrs[key] = value.replace(/['"]/g, ''); // 移除引号
            } else {
                attrs[key] = true; // 没有值的属性设置为true
            }
        }
        return attrs;
    }

    function isTagOpen(char) {
        return char === '<' && !tagOpen;
    }

    function isTagClose(char) {
        return char === '>' && tagOpen;
    }

    function isSelfClosingTag(tagName) {
        // 这里可以添加更多自闭合标签的判断
        return false;
    }

    for (let i = 0; i < htmlStr.length; i++) {
        const char = htmlStr[i];
        if (isTagOpen(char)) {
            let endIndex = htmlStr.indexOf('>', i);
            if (endIndex === -1) {
                throw new Error('Unclosed tag');
            }
            const tagStr = htmlStr.substring(i + 1, endIndex);
            const tagEndIndex = tagStr.indexOf('/');
            if (tagEndIndex !== -1) {
                endTag(tagStr.substring(tagEndIndex + 1));
            } else {
                tagOpen = true;
                const spaceIndex = tagStr.indexOf(' ');
                if (spaceIndex !== -1) {
                    tagName = tagStr.substring(0, spaceIndex);
                    const attrStr = tagStr.substring(spaceIndex + 1);
                    attrs = parseAttrs(attrStr);
                } else {
                    tagName = tagStr;
                }
                startTag(tagName, attrs);
            }
            i = endIndex;
        } else if (isTagClose(char)) {
            tagOpen = false;
        } else if (!tagOpen) {
            content += char;
        }
    }

    if (currentNode) {
        currentNode.content = content.trim();
    }

    return stack[0];
}
console.log('😐', JSON.stringify(parseHTML(htmlStr)))


/**
  <div class="home_closePriceInfoWrap__pQNUe">
            <span class="home_label__E7nPs">收盘价：</span>--
        </div>
        <div class="home_volumeWrap__vGeyt">
            <span class="home_label__E7nPs">成交量：</span>
            <span class="home_volumeValue__soSoM">--</span>
        </div>
        <img src="" style="width:1px !important;height:1px !important;position:absolute;top:0;" tabindex="-1"/>
        <a id = "ariaTipText" role = "pagedescription" aria-label="欢迎进入 中国国际航空公司-飞机票查询预订_航班查询_最新打折特价机票,盲人用户使用操作智能引导，请按快捷键Ctrl+Alt+R；阅读详细操作说明请按快捷键Ctrl+Alt+问号键。" aria - atomic="true" href = "javascript:void(0)" class="skipAutoFix ariaskiptheme" style = "width: 1px; height: 1px;" > 
            <img src="" style="width:1px !important;height:1px !important;position:absolute;top:0;" tabindex="-1"/>
        </a>
 */

