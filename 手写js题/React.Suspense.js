// React的懒加载简单使用：React.lazy + React.Suspense
// 利用React.lazy懒加载路由，import是异步的，返回的是一个promise
const Home = React.lazy(() => import('./containers/version2/accredit/HomePageV2'))

class App extends React.Component{
    render() {
        return (
            /**
             * 1、React.Suspense 中fallback可以传DOM元素，也可以传一个组件，表示 当Home组件没有加载回来之前，
             * 页面渲染fallback中的组件
             * 2、React.suspense不只是针对于懒加载的路由，而针对所有懒加载的组件，只要是存在懒加载的，
             * 都可以通过在外成包裹 React.suspense来实现loading或其他占位dom
             */
            <React.Suspense fallback={<div>Loading...</div>}>
                <Route path="/" element={<Home />} />
            </React.Suspense>
        )
    }
}

// React.Suspense的简单实现
class _Suspense extends React.Component{
     
    constructor(props) {
        super(props)
        this.state = {
            promiss: null
        }
    }

    // 抓取子组件中抛出的错误，但是不能抓取自身抛出的错误，一般用在错误边界里
    componentDidCatch(e) {
        // 因为当import还未加载完时(处于pending状态)，会抛出一个promise实例的错误，
        // 所以在这里捕捉到这个错误，并监听，当变成fullfilled状态时，将promise设为null，正常显示组件
        if (e instanceof Promise) {
            this.setState({
                promiss: e
            }, () => {
                e.then(() => {
                    this.setState({promiss: null})
                })
            })
        }
    }

    render() {
        const { fallback, children } = this.props
        return (
            <>
                {this.state.promiss ? fallback : children}
            </>
        )
    }
}