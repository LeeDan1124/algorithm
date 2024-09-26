/**
 * https://leetcode.cn/problems/keys-and-rooms/
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function (rooms) {
    const visited = new Array(rooms.length).fill(false)
    const keys = new Set()
    keys.add(0)

    const keysQueue = [0]
    while (keysQueue.length) {
        const curRoomIndex = keysQueue.pop()
        if (visited[curRoomIndex]) {
            continue
        }
        const curRoomKeys = rooms[curRoomIndex]

        keysQueue.push(...curRoomKeys)
        curRoomKeys.forEach(x => keys.add(x))
        visited[curRoomIndex] = true
    }
    return [...keys].length === rooms.length
};