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

count = 0

let guard = () => {
    return {
        ...startPosition, shiftX: 0, shiftY: -1,
        nextX: function () {
            return this.x + this.shiftX
        },
        nextY: function () {
            return this.y + this.shiftY
        },
        canMakeNextStep: function () {
            if (this.nextX() < 0) return false
            if (this.nextX() >= labMap[0].length) return false
            if (this.nextY() < 0) return false
            if (this.nextY() >= labMap.length) return false
            return true
        },
        turnRight: function () {
            if (this.shiftX === 0 && this.shiftY === -1) {
                this.shiftX = 1
                this.shiftY = 0
            } else if (this.shiftX === 1 && this.shiftY === 0) {
                this.shiftX = 0
                this.shiftY = 1
            } else if (this.shiftX === 0 && this.shiftY === 1) {
                this.shiftX = -1
                this.shiftY = 0
            } else if (this.shiftX === -1 && this.shiftY === 0) {
                this.shiftX = 0
                this.shiftY = -1
            }
        }

    }
}


const checkLoop = (x, y) => {
    const passedPoints = {}

    const m = structuredClone(labMap)
    m[y][x] = '#'
    const g = guard()
    let loop = false

    // console.log(m.map(x => x.join("")).join('\n\r'))
    do {
        const nextPlace = m[g.y + g.shiftY][g.x + g.shiftX]

        if (nextPlace !== '#') {
            // Make next step
            g.x += g.shiftX
            g.y += g.shiftY
        } else {
            const coord = `x${g.x}y${g.y}`
            if (passedPoints[coord]>1) {
                loop = true
                break
            }

            if (passedPoints[coord]) {
                passedPoints[coord] += 1
            } else {
                passedPoints[coord] = 1
            }

            g.turnRight()
        }
    } while (g.canMakeNextStep())

    return loop
}

const printMap = structuredClone(labMap)


for (let x = 0; x < labMap[0].length; x++) {
    for (let y = 0; y < labMap.length; y++) {
        if (labMap[y][x] !== '#' && labMap[y][x] !== '^') {
            console.log('x', x, 'y', y)
            const a = checkLoop(x, y)
            if (a) {
                printMap[y][x] = '0'
                console.log('x', x, 'y', y, a)
            }
            count += a ? 1 : 0
        }
    }
}


console.log(printMap.map(x => x.join("")).join('\n\r'))

// console.log(labMap.flatMap(x => x).filter(x => x === 'X').length + 1)

console.log(count)


