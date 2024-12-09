const fs = require('fs')

const rawContent = fs.readFileSync('./day08/input.txt', { encoding: 'utf8' })
const field = rawContent.split('\r\n').map(x => x.split(''))

const antenas = field.reduce((antenas, line, y) => {
    line.forEach((frequency, x) => {
        if (frequency !== '.') {
            if (!antenas[frequency]) {
                antenas[frequency] = [{ x, y }]
            } else {
                antenas[frequency].push({ x, y })
            }
        }
    });
    return antenas
}, {})

const fieldCalculated = []

const insideField = (coord) => {
    return coord.x >= 0 && coord.y >= 0 && coord.x < field[0].length && coord.y < field.length
}

for (antena in antenas) {

    const antinodes = []
    const antenaArr = antenas[antena]
    for (let i = 0; i < antenaArr.length; i++) {

        for (let j = i + 1; j < antenaArr.length; j++) {

            const coord1 = antenaArr[i]
            const coord2 = antenaArr[j]

            const distanceX = coord1.x - coord2.x
            const distanceY = coord1.y - coord2.y

            let antinode = {}

            let m1 = 0
            do {
                antinode = {
                    x: coord1.x + distanceX * m1,
                    y: coord1.y + distanceY * m1
                }
                antinodes.push(antinode)
                m1++

            } while (insideField(antinode))

            let m2 = 0
            do {

                antinode = {
                    x: coord2.x - distanceX * m2,
                    y: coord2.y - distanceY * m2
                }
                antinodes.push(antinode)
                m2++

            } while (insideField(antinode))
        }
    }

    fieldCalculated.push({
        frequency: antena,
        antenas: antenas[antena],
        antinodes
    })
}

const uniqeAntinodes = new Set()
fieldCalculated.forEach(x => {
    x.antinodes
        .filter(antinode => antinode.x >= 0 && antinode.x < field[0].length && antinode.y >= 0 && antinode.y < field.length)
        .forEach(antinode => {
            uniqeAntinodes.add(`x${antinode.x}y${antinode.y}`)
        })
})

console.dir(fieldCalculated, { depth: 3 })
console.log(uniqeAntinodes.size)