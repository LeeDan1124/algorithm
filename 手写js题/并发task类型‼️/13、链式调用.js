class LazyManO{
  constructor(manName) {
    this.tasks = [() => {
      console.log(`Hi! This is ${manName}`)
      this.next() // 这里也要有一个执行this.next的动作，是为了执行下一个task
    }]

    // 使用setTimeout可以利用宏任务的特点，实现所有的task都收集好，再开始执行
    setTimeout(() => {
      this.next()
    })
  }

  next() {
    if (this.tasks.length === 0) return
    const curTask = this.tasks.shift()
    curTask()
  }
  
  sleep(delay) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${delay}`)
        this.next()  // 在这里执行this.next可以实现同步执行sleep的效果
      }, delay * 1000)
    }
    this.tasks.push(task)
    return this
  }

  eat(food) {
    const task = () => {
      console.log(`Eat ${food}`)
      this.next()
    }
    this.tasks.push(task)
    return this
  }

  sleepFirst(delay) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${delay}`)
        this.next()
      }, delay * 1000)
    }
    this.tasks.unshift(task)  // 这里要放到任务队列的第一个
    return this
  }
}

function LazyMan(manName) {
  return new LazyManO(manName)
}


LazyMan('Hank') // Hi! This is Hank

LazyMan('Hank').sleep(10).eat('dinner') 
// Hi! This is Hank
// 等待10s
// Wake up after 10
// Eat dinner~

LazyMan('Hank').eat('dinner').eat('supper') 
// Hi! This is Hank
// Eat dinner~
// Eat supper~

LazyMan('Hank').sleepFirst(5).eat('supper') 
// 等待5s
// Wake up after 5
// Hi! This is Hank
// Eat supper~

