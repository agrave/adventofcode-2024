const fs = require('fs')

const rawContent = fs.readFileSync('./day10/input.txt', { encoding: 'utf8' })

const map = rawContent.split('\r\n').map(x => x.split('').map(x => parseInt(x)))
let rating = 0

const nextStep = (point) => {
    let up, down, left, right
    const { x, y, h } = point
    if (h === 9) return []

    up = (y - 1 >= 0) && (map[y - 1][x] === h + 1) ? { h: h + 1, x: x, y: y - 1 } : undefined
    down = (y + 1 < map.length) && (map[y + 1][x] === h + 1) ? { h: h + 1, x: x, y: y + 1 } : undefined
    right = (x + 1 < map[0].length) && (map[y][x + 1] === h + 1) ? { h: h + 1, x: x + 1, y: y } : undefined
    left = (x - 1 >= 0) && (map[y][x - 1] === h + 1) ? { h: h + 1, x: x - 1, y: y } : undefined

    res = [up, down, left, right].filter(Boolean)

    rating += res.length - 1

    return res
}

const route = (startPoint) => {
    const points = [startPoint]
    for (let h = 0; h < 10; h++) {
        points.filter(point => point.h === h)
            .forEach(point => points.push(...nextStep(point)))
    }
    return points
}

let summ = 0

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (map[y][x] === 0) {
            rating++
            const hikingTrail = route({ h: 0, x, y })
            const score = new Set(hikingTrail.filter(point => point.h === 9).map(point => `x${point.x}y${point.y}`)).size
            summ += score
        }
    }
}



console.log( rating)
