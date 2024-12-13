const fs = require('fs')

const rawContent = fs.readFileSync('./day13/input.txt', { encoding: 'utf8' })

const prizes = rawContent.split('\r\n\r\n').map(block => {
    const [buttonA, buttonB, prize] = block.split('\r\n')
    const [aX, aY] = buttonA.match(/\d+/g).map(Number)
    const [bX, bY] = buttonB.match(/\d+/g).map(Number)
    const [pX, pY] = prize.match(/\d+/g).map(Number)

    return { aX, aY, bX, bY, pX, pY }
})

const scores = prizes.map(c => {
    const eqution = []
    for (let a = 1; a < 101; a++) {
        for (let b = 1; b < 101; b++) {
            const x = c.aX * a + c.bX * b
            const y = c.aY * a + c.bY * b
            if (x === c.pX && y === c.pY) eqution.push({ a, b, score: a * 3 + b })
        }
    }
    return eqution.sort((first, second) => first.score - second.score)
})

const res = scores.reduce((summ, item) => {
    if (item.length > 0) {
        summ += item[0].score
    }
    return summ
}, 0)

console.log(prizes)
console.log(scores)
console.log(res)