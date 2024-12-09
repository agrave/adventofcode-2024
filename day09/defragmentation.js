const fs = require('fs')

const rawContent = fs.readFileSync('./day09/input.txt', { encoding: 'utf8' })


let id = 0
let disc = []


// encrypt disk
for (let i = 0; i < rawContent.length; i++) {

    num = parseInt(rawContent.at(i))

    if (i % 2 === 0) {
        disc.push(...Array(num).fill(id))
        id++
    } else {
        disc.push(...Array(num).fill('.'))
    }
}

console.log(disc.join(''))

// defragmentation
let firstFreeSpace = -1
let n = disc.length - 1
do {
    file = disc[n]
    if (file !== '.') {
        firstFreeSpace = disc.indexOf('.')
        if (firstFreeSpace < n) {
            disc[firstFreeSpace] = file
            disc[n] = '.'
        }
    }
    n--
} while (firstFreeSpace < n)

console.log(disc.join(''))

// calculate checksumm
const chekSumm = disc.filter(x => x !== '.').reduce((summ, item, index) => {
    summ += item * index
    return summ
}, 0)


console.log(chekSumm)
