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

for (antena in antenas) {

    const antinodes = []
    const antenaArr = antenas[antena]
    for (let i = 0; i < antenaArr.length; i++) {

        for (let j = i + 1; j < antenaArr.length; j++) {

            const coord1 = antenaArr[i]
            const coord2 = antenaArr[j]

            const distanceX = coord1.x - coord2.x
            const distanceY = coord1.y - coord2.y

            const antinode1 = {
                x: coord1.x + distanceX,
                y: coord1.y + distanceY
            }

            const antinode2 = {
                x: coord2.x - distanceX,
                y: coord2.y - distanceY
            }

            antinodes.push(antinode1, antinode2)
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

// console.dir(fieldCalculated, { depth: 3 })
console.log(uniqeAntinodes.size)