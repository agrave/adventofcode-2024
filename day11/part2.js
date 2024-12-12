const fs = require('fs')

const rawContent = fs.readFileSync('./day11/input.txt', { encoding: 'utf8' })

let stones = new Map()
rawContent.split(' ').map(x => parseInt(x)).forEach(x => stones.set(x, 1))

const addValue = (value, key, storage) => {
    const currentValue = storage.get(key)
    storage.set(key, value + (currentValue ? currentValue : 0))
}

const blink = (stones) => {
    const nextStones = new Map()
    stones.forEach((value, key) => {
        const str = key.toString()
        const strLen = key.toString().length
        if (key === 0) {
            addValue(value, 1, nextStones)
        } else if (strLen % 2 === 0) {
            const first = parseInt(str.slice(0, strLen / 2))
            const second = parseInt(str.slice(strLen / 2))

            addValue(value, first, nextStones)
            addValue(value, second, nextStones)
        } else {
            const nextV = key * 2024
            addValue(value, nextV, nextStones)
        }
    })
    return nextStones
}

let summ = 0

for (let i = 0; i < 75; i++) {
    stones = blink(stones)
}

stones.forEach((value, key) => {
    summ += value
})

console.log(summ)

