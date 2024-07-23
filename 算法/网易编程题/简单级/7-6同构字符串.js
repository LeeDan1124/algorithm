/**
给定两个字符串 s 和 t ，判断它们是否是同构的。

如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。

每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身。

输入格式:
输入两个字符串s和t，且满足以下条件：

1 <= s.length <= 5 * 10^4

t.length == s.length

s 和 t 由任意有效的 ASCII 字符组成

输出格式:
如果是同构字符串则返回1，否则返回 0

输入样例1:
在这里给出一组输入。例如：

egg,add
输出样例1:
在这里给出相应的输出。例如：

1
输入样例2:
在这里给出一组输入。例如：

foo,bar
输出样例2:
在这里给出相应的输出。例如：

0
输入样例3:
在这里给出一组输入。例如：

paper,title
输出样例3:
在这里给出相应的输出。例如：

1
 */

// 需要把两个字符串之间的映射都保存且判断一下，不然会有foo,bar这种，b-f  a-o r-o 两个字母ar都映射到了o，就会有问题
function isIsomorphismStr(str1, str2) {
    if (str1.length !== str2.length) return 0
    
    const map12 = new Map() // s1 -> s2
    const map21 = new Map() // s2 -> s1
    for (let i = 0; i < str1.length; i++) {
        const s1 = str1[i]
        const s2 = str2[i]

        if (!map12.has(s1) && !map21.has(s2)) {
            map12.set(s1, s2)
            map21.set(s2, s1)
        } else if (map12.get(s1) !== s2 || map21.get(s2) !== s1) {
            return 0
        }
    }
    return 1
}