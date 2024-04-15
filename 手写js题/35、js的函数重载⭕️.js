// ✅
/**
 * 实现一个函数
 * getUser() // 获取全部数据
 * getUser(1) // 获取第一页的人
 * getUser(1, 20) // 获取第一页前20的人
 * getUser(1, '张') // 获取第一页姓张的人
 * getUser('张', '女') // 获取张姓 的女性
 */
const fun = () => {

    const handleMap = new Map()
    const addHandle = (argusTypeStr, cb) => {
        if (typeof cb !== 'function') {
            return Error('请传入回调函数')
        }
        handleMap.set(argusTypeStr, cb)
    }

    addHandle('empty', () => {
        console.log('获取全部数据')
    })
    addHandle('number', (n) => {
        console.log(`获取第${n}页的人`)
    })
    addHandle('number+number', (page, num) => {
        console.log(`获取第${page}页前${num}的人`)
    })
    addHandle('number+string', (page, surname) => {
        console.log(`获取第${page}页姓${surname}的人`)
    })
    addHandle('string+string', (surname, sex) => {
        console.log(`获取${surname}姓 的${sex}性`)
    })
 
    function getUser() {
        let argusTypeStr = [...arguments].reduce((pre, cur) => {
            const flag = !!pre ? '+' : ''
            pre = pre + `${flag}${typeof cur}`
            return pre
        }, '')
        if (!argusTypeStr) {
            argusTypeStr = 'empty'
        }
        const cb = handleMap.get(argusTypeStr)
        return cb(...arguments)
    }

    return {getUser}
}
const { getUser } = fun()

getUser() // 获取全部数据
getUser(1) // 获取第一页的人
getUser(1, 20) // 获取第一页前20的人
getUser(1, '张') // 获取第一页姓张的人
getUser('张', '女') // 获取张姓 的女性