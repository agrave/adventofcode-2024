const fs = require('fs')

const rawContent = fs.readFileSync('./day04/input.txt', { encoding: 'utf8' })
const content = rawContent.split('\r\n').map(line => line.split(""))

const XMAS = {
    rightH: { m: { x: 1, y: 0 }, a: { x: 2, y: 0 }, s: { x: 3, y: 0 } },
    leftH: { m: { x: -1, y: 0 }, a: { x: -2, y: 0 }, s: { x: -3, y: 0 } },

    upV: { m: { x: 0, y: 1 }, a: { x: 0, y: 2 }, s: { x: 0, y: 3 } },
    downV: { m: { x: 0, y: -1 }, a: { x: 0, y: -2 }, s: { x: 0, y: -3 } },

    rightUpD: { m: { x: 1, y: -1 }, a: { x: 2, y: -2 }, s: { x: 3, y: -3 } },
    rightDownD: { m: { x: 1, y: 1 }, a: { x: 2, y: 2 }, s: { x: 3, y: 3 } },

    lefttUpD: { m: { x: -1, y: -1 }, a: { x: -2, y: -2 }, s: { x: -3, y: -3 } },
    lefttDownD: { m: { x: -1, y: 1 }, a: { x: -2, y: 2 }, s: { x: -3, y: 3 } },
}

const maxY = content.length
const maxX = content[0].length

let count = 0

for (let y = 0; y < maxY; y++) {
    line = content[y]
    for (let x = 0; x < maxX; x++) {
        const char = content[y][x]

        // skip non X char
        if (char !== 'X') continue

        for (const d in XMAS) {
            const horizontal = x + XMAS[d].s.x
            const verical = y + XMAS[d].s.y
            // check if vector applicable
            if (horizontal < 0 || verical < 0 || horizontal >= maxX || verical >= maxY) {
                continue
            }
            if (content[y + XMAS[d].m.y][x + XMAS[d].m.x] !== 'M') continue
            if (content[y + XMAS[d].a.y][x + XMAS[d].a.x] !== 'A') continue
            if (content[y + XMAS[d].s.y][x + XMAS[d].s.x] !== 'S') continue

            count += 1
        }
    }
}

console.log(count)