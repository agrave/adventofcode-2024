const fs = require('fs')

const rawContent = fs.readFileSync('./day04/input.txt', { encoding: 'utf8' })
const content = rawContent.split('\r\n').map(line => line.split(""))

const XMAS = {
    msms: { m1: { x: -1, y: -1 }, s1: { x: 1, y: -1 }, m2: { x: -1, y: 1 }, s2: { x: 1, y: 1 } },
    mmss: { m1: { x: -1, y: -1 }, m2: { x: 1, y: -1 }, s1: { x: -1, y: 1 }, s2: { x: 1, y: 1 } },
    ssmm: { s1: { x: -1, y: -1 }, s2: { x: 1, y: -1 }, m1: { x: -1, y: 1 }, m2: { x: 1, y: 1 } },
    smsm: { s1: { x: -1, y: -1 }, m1: { x: 1, y: -1 }, s2: { x: -1, y: 1 }, m2: { x: 1, y: 1 } },
}

const maxY = content.length - 1
const maxX = content[0].length - 1

let count = 0

for (let y = 1; y < maxY; y++) {
    line = content[y]
    for (let x = 1; x < maxX; x++) {
        const char = content[y][x]

        // skip non A char
        if (char !== 'A') continue

        for (const d in XMAS) {

            if (content[y + XMAS[d].m1.y][x + XMAS[d].m1.x] !== 'M') continue
            if (content[y + XMAS[d].m2.y][x + XMAS[d].m2.x] !== 'M') continue
            if (content[y + XMAS[d].s1.y][x + XMAS[d].s1.x] !== 'S') continue
            if (content[y + XMAS[d].s2.y][x + XMAS[d].s2.x] !== 'S') continue

            count += 1
        }
    }
}

console.log(count)