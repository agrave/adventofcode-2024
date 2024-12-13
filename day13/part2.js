const fs = require('fs')

const rawContent = fs.readFileSync('./day13/input.txt', { encoding: 'utf8' })
const delta = 10000000000000
// const delta = 0

const prizes = rawContent.split('\r\n\r\n').map(block => {
    const [buttonA, buttonB, prize] = block.split('\r\n')
    const [aX, aY] = buttonA.match(/\d+/g).map(Number)
    const [bX, bY] = buttonB.match(/\d+/g).map(Number)
    const [pX, pY] = prize.match(/\d+/g).map(Number)

    return { aX, aY, bX, bY, pX: pX + delta, pY: pY + delta }
})

// console.log(prizes)

const scores = prizes.map(c => {

    const b = (c.aY * c.pX - c.aX * c.pY) / (c.aY * c.bX - c.aX * c.bY)
    const a = (c.pX - c.bX * b) / c.aX

    const eqution = []
    if (Number.isInteger(a)) {
        eqution.push({ a, b, score: a * 3 + b })
    }
    return eqution.sort((first, second) => first.score - second.score)
})

// console.log(scores)

const res = scores.reduce((summ, item) => {
    if (item.length > 0) {
        summ += item[0].score
    }
    return summ
}, 0)

console.log(res)