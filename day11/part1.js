const fs = require('fs')

const rawContent = fs.readFileSync('./day11/input.txt', { encoding: 'utf8' })

let stones = rawContent.split(' ').map(x => parseInt(x))

// console.log(stones)

const blink = stones => {
    return stones.map(stone => {
        const str = stone.toString()
        const strLen = stone.toString().length
        if (stone === 0) return 1
        if (strLen % 2 === 0) {
            return [parseInt(str.slice(0, strLen / 2)), parseInt(str.slice(strLen / 2))]
        }
        return stone * 2024
    }).flat(1)
}

for (let i = 0; i < 25; i++) {
    stones = blink(stones)
    // console.log(stones)
}

console.log(stones.length)

