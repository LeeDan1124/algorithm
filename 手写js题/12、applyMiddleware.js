function applyMiddleware(...middlewares) {

    return function enhancer(createStore) {

        const newCreateStore = (reducer, ininState) => {
            const oldStore = createStore(reducer, ininState)
            const { dispatch: oldDispatch} = oldStore

            // const newDisPatch = middleware(oldStore)(oldDispatch)
            const newDisPatch = middlewares.reduce((preMiddleware, curMiddleware) => {
                return curMiddleware(oldStore)(preMiddleware)
            }, oldDispatch)

            return {
                ...oldStore,
                dispatch: newDisPatch
            }
        }

        return newCreateStore
    }
}



function test(middlewares) {
    const oldStore = {a: 1}
    const oldDispatch = () => {
        console.log(1)
    }
    const newDisPatch = middlewares.reduceRight((preMiddleware, curMiddleware) => {
        return curMiddleware(oldStore)(preMiddleware)
    }, oldDispatch)
    return newDisPatch
}

function mid1 (oldStore) {
    return function(preMiddleware) {
        console.log(oldStore, preMiddleware, '====1')
        return function mid1Ware() {
        }
    }
}

function mid2 (oldStore) {
    return function(preMiddleware) {
        console.log(oldStore, preMiddleware, '====2')
        return function mid2Ware() {
        }
    }
}

function mid3 (oldStore) {
    return function(preMiddleware) {
        console.log(oldStore, preMiddleware, '====3')
        return function mid3Ware() {
        }
    }
}

console.log(test([mid1, mid2, mid3]))