// 使用
import Loadable from "react-loadable";
import Loading from "./my-loading-component";

const LoadableComponent = Loadable({
  loader: () => import("./my-component"),
  loading: Loading,
});

export default class App extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}

// 简单实现
function Loadable(opts) {
    const { loading: LoadingComponent, loader } = opts;
    return class LoadableComponent extends React.Component {
        constructor(props) {
        super(props);
        this.state = {
            loading: true, // 是否加载中
            loaded: null, // 待加载的模块
        };
        }
        componentDidMount() {
            loader()
                .then((loaded) => {
                    this.setState({
                        loading: false,
                        loaded,
                    });
                })
                .catch(() => {});
        }

        render() {
            const { loading, loaded } = this.state;
            if (loading) {
                return <LoadingComponent />;
            } else if (loaded) {
                // 默认加载default组件
                const LoadedComponent = loaded.__esModule ? loaded.default : loaded;
                return <LoadedComponent {...this.props} />;
            } else {
                return null;
            }
        }
    };
}
