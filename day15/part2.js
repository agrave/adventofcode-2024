const fs = require('fs')

const rawContent = fs.readFileSync('./day15/input.txt', { encoding: 'utf8' })

const wall = '#'
const box = 'O'
const empty = '.'

const [storeStr, movesStr] = rawContent.split('\r\n\r\n')

const store = storeStr.split('\r\n').map(x => x.split('').flatMap(x => {
    if (x === wall) return [wall, wall]
    if (x === box) return ['[', ']']
    if (x === empty) return [empty, empty]
    if (x === '@') return ['@', empty]
}))

// console.log(store.map(x => x.join('')).join('\r\n'))


const robotCoord = () => {
    for (let y = 0; y < store.length; y++) {
        for (let x = 0; x < store[y].length; x++)
            if (store[y][x] === '@') {
                return { x, y }
            }
    }
}

function canMoveBox(x, y, d, t = '@') {
    let redraw = [{ x, y, t }]
    if (store[y + d][x] === wall) { redraw = [-1] }
    if (store[y + d][x] === '[') {
        redraw.push(...canMoveBox(x, y + d, d, '['))
        redraw.push(...canMoveBox(x + 1, y + d, d, ']'))
    }
    if (store[y + d][x] === ']') {
        redraw.push(...canMoveBox(x, y + d, d, ']'))
        redraw.push(...canMoveBox(x - 1, y + d, d, '['))
    }

    return d === 1 ? redraw.sort((a, b) => a.y - b.y) : redraw.sort((a, b) => b.y - a.y)
}

const robot = {
    ...robotCoord(),
    move: function (direction) {
        const right = '>'
        const left = '<'
        const up = '^'
        const down = 'v'

        let x = 0, y = 0, shift, boxesToMove = []
        switch (direction) {
            case right:
                shift = 1
                while (store[this.y][this.x + shift] !== wall) {
                    if (store[this.y][this.x + shift] === empty) {
                        x = 1
                        break
                    }
                    shift++
                }
                break;
            case left:
                shift = 1
                while (store[this.y][this.x - shift] !== wall) {
                    if (store[this.y][this.x - shift] === empty) {
                        x = -1
                        break
                    }
                    shift++
                }
                break;

            case up:
                boxesToMove = canMoveBox(this.x, this.y, -1)
                if (boxesToMove.indexOf(-1) === -1) {
                    y = -1
                }
                break;
            case down:
                boxesToMove = canMoveBox(this.x, this.y, 1)
                if (boxesToMove.indexOf(-1) === -1) {
                    y = 1
                }
                break;
            default:
                break;
        }

        // draw horizontal move 
        if (x === 1) {
            for (p = this.x + shift; p > this.x; p--) {
                store[this.y][p] = store[this.y][p - 1]
            }
            store[this.y][this.x] = empty
        }
        if (x === -1) {
            for (p = this.x - shift; p < this.x; p++) {
                store[this.y][p] = store[this.y][p + 1]
            }
            store[this.y][this.x] = empty
        }
        // draw vertical move
        if (y === -1) {
            boxesToMove.sort((a, b) => a.y - b.y).forEach(part => {
                store[part.y - 1][part.x] = part.t
                store[part.y][part.x] = empty
            })
        }
        if (y === 1) {
            boxesToMove.sort((a, b) => b.y - a.y).forEach(part => {
                store[part.y + 1][part.x] = part.t
                store[part.y][part.x] = empty
            })
        }
        this.x += x
        this.y += y

    }
}

// console.log(robot)

for (let p = 0; p < movesStr.length; p++) {
    robot.move(movesStr.at(p))
    // console.log(store.map(x => x.join('')).join('\r\n'))
}

let res = 0
for (let y = 0; y < store.length; y++) {
    for (let x = 0; x < store[y].length; x++)
        if (store[y][x] === '[') {
            res += 100 * y + x
        }
}


// console.log(store.map(x => x.join('')).join('\r\n'))

console.log(res)