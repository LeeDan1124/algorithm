
/**
 * 该函数可以指定某一个组件在第几帧开始执行渲染
 * maxCount: 一共有几个组件
 * n: 这个组件在第几帧执行
 */
function useDefer(maxCount) {
  
}


// const { defer } = useDefer(100)
// <div>
//     {/* 第一帧的时候渲染Comp1 */}
//     {
//         defer(1) && <Comp1 />
//     }
//     {/* 第2帧的时候渲染Comp2 */}
//     {
//         defer(2) && <Comp2 />
//     }
//     {/* 第3帧的时候渲染Comp3 */}
//     {
//         defer(3) && <Comp3 />
//     }
//      .....
// </div>