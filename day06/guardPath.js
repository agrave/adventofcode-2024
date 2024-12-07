const fs = require('fs')

const rawContent = fs.readFileSync('./day06/input.txt', { encoding: 'utf8' })

const labMap = rawContent.split('\r\n').map(x => x.split(''))

const startPosition = labMap.reduce((position, line, y) => {
    const x = line.indexOf('^')
    if (x !== -1) {
        position.x = x
        position.y = y
    }
    return position
}, { x: -1, y: -1 })

let guard = {
    ...startPosition, shiftX: 0, shiftY: -1,
    nextX: function () {
        return this.x + this.shiftX
    },
    nextY: function () {
        return this.y + this.shifty
    }
}

const outOfLab = () => {
    const nextX = guard.x + guard.shiftX
    const nextY = guard.y + guard.shiftY
    if (nextX < 0) return true
    if (nextX >= labMap[0].length) return true
    if (nextY < 0) return true
    if (nextY >= labMap.length) {
        return true
    }
    return false
}



do {
    labMap[guard.y][guard.x] = 'X'

    if (labMap[guard.y + guard.shiftY][guard.x + guard.shiftX] !== '#') {
        // Make next step
        guard.x += guard.shiftX
        guard.y += guard.shiftY
    } else {
        // turn right
        if (guard.shiftX === 0 && guard.shiftY === -1) {
            guard.shiftX = 1
            guard.shiftY = 0
        } else if (guard.shiftX === 1 && guard.shiftY === 0) {
            guard.shiftX = 0
            guard.shiftY = 1
        } else if (guard.shiftX === 0 && guard.shiftY === 1) {
            guard.shiftX = -1
            guard.shiftY = 0
        } else if (guard.shiftX === -1 && guard.shiftY === 0) {
            guard.shiftX = 0
            guard.shiftY = -1
        }
    }
    // console.log(labMap.map(x => x.join("")).join('\n\r'))
    // console.log('--------------------------------')

} while (!outOfLab())

console.log(labMap.map(x => x.join("")).join('\n\r'))

console.log(labMap.flatMap(x => x).filter(x => x === 'X').length + 1)



