interface Aritical {
    content: string,
    author: string,
    zhuti: string,
    zhaiyao: string,
    qingjie?: string,
    zhujue?: Array<string>
}

// 把某些属性转成可选参数
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// test
type OptionalCls = Optional<Aritical, 'zhaiyao' | 'zhuti'>
const o: OptionalCls = {
    content: 'string',
    author: 'string',
}



// 把某些参数转成必选参数
type Mustional<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: T[K]
}

// test
type MustionalCls = Mustional<Aritical, 'qingjie' | 'zhujue'>
const m: MustionalCls = {
    content: 'string',
    author: 'string',
    zhuti: 'string',
    zhaiyao: 'string',
     qingjie: 'string',
    zhujue: ['1']
}
