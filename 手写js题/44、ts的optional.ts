interface Aritical {
    content: string,
    author: string,
    zhuti: string,
    zhaiyao: string
}

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type CreateNewArital = Optional<Aritical, 'zhuti' | 'zhaiyao'>

const MyArtical = (artical: CreateNewArital) => {
    // ....
}
MyArtical({
    content: 'i am content',
    author: 'lidan'
})