for (let i = 0; i < 10; i++) {
    console.log('外层for循环')
    for (let j = 0; j < 6; j++) {
        console.log('里层for循环')
        for (let k = 0; k < 3; k++) {
            console.log('最里层for循环')
            if (k === 2) {
                // 跳出最外层的循环
            }
        }
    }
}