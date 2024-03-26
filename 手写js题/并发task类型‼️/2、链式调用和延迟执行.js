function arrange(name) {

}

arrange('William')
    .wait(5)
    .Do('commit')
    .waitFirst(3)
    .execute()

/**
 * 只有调用execute时才执行
 * 等待3秒--输出William is notify
 * 再等待5秒--输出start to commit
 */