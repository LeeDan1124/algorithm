class TaskPro{

}


// 执行next()后，执行下一个任务，最后再回来执行next后面的代码
const task = new TaskPro()
task.addTask(async (next) => {
  console.log('1 start')
  await next()
  console.log('1 end')
})
task.addTask(() => {
  console.log(2)
})
task.addTask(() => {
  console.log(3)
})
task.run() // 输出 1 start、2、3、1 end