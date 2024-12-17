const fs = require('fs')

const rawContent = fs.readFileSync('./day15/input.txt', { encoding: 'utf8' })

const [storeStr, movesStr] = rawContent.split('\r\n\r\n')
const store = storeStr.split('\r\n').map(x => x.split(''))

const wall = '#'
const box = 'O'
const empty = '.'

const robotCoord = () => {
    for (let y = 0; y < store.length; y++) {
        for (let x = 0; x < store[y].length; x++)
            if (store[y][x] === '@') {
                return { x, y }
            }
    }
}



const robot = {
    ...robotCoord(),
    move: function (direction) {
        const right = '>'
        const left = '<'
        const up = '^'
        const down = 'v'

        let x = 0, y = 0, shift
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
                shift = 1
                while (store[this.y - shift][this.x] !== wall) {
                    if (store[this.y - shift][this.x] === empty) {
                        y = -1
                        break
                    }
                    shift++
                }
                break;

            case down:
                shift = 1
                while (store[this.y + shift][this.x] !== wall) {
                    if (store[this.y + shift][this.x] === empty) {
                        y = 1
                        break
                    }
                    shift++
                }
                break;
            default:
                break;
        }

        if (x !== 0 || y !== 0) {
            store[this.y][this.x] = empty
            store[this.y + y][this.x + x] = '@'
            if (shift > 1) {
                store[this.y + y * shift][this.x + x * shift] = box
            }
            this.x += x
            this.y += y
        }
    }
}

for (let p = 0; p < movesStr.length; p++) {
    robot.move(movesStr.at(p))
}

let res = 0
for (let y = 0; y < store.length; y++) {
    for (let x = 0; x < store[y].length; x++)
        if (store[y][x] === box) {
            res += 100 * y + x
        }
}



console.log(store.map(x => x.join('')).join('\r\n'))
console.log(res)