const fs = require('fs')

const rawContent = fs.readFileSync('./day09/input.txt', { encoding: 'utf8' })

let id = 0
let disc = []

// encrypt disk
for (let i = 0; i < rawContent.length; i++) {
    num = parseInt(rawContent.at(i))
    if (i % 2 === 0) {
        disc.push(Array(num).fill(id))
        id++
    } else {
        disc.push(Array(num).fill('.'))
    }
}

// console.log(disc.map(x => x.join('')).join(''))
// console.log(disc)

// defragmentation
let freeSpace = -1
let n = disc.length - 1
do {
    file = disc[n]
    if (file[0] !== '.' && file.length > 0) {

        freeSpace = disc.findIndex(item => item[0] === '.' && item.length >= file.length)

        if (freeSpace !== -1 && freeSpace < n) {

            const leftover = disc[freeSpace].length - file.length
            disc[freeSpace] = Array(file.length).fill(file[0])
            if (leftover > 0) {
                disc.splice(freeSpace + 1, 0, Array(leftover).fill('.'))
                n++
            }

            disc[n] = [...Array(file.length).fill('.')]
        }
    }
    n--
} while (disc[n][0] != 0)

// console.log(disc.map(x => x.join('')).join(''))

// calculate checksumm
const chekSumm = disc.flat().reduce((summ, item, index) => {
    if (item !== '.') { summ += item * index }
    return summ
}, 0)


console.log(chekSumm)
