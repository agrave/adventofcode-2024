const fs = require('fs')

const rawContent = fs.readFileSync('./day03/input.txt', { encoding: 'utf8' })

const instructionTemplate = /mul\(\d{1,3},\d{1,3}\)/g

const parsedText = [...rawContent.matchAll(instructionTemplate)]

const result = parsedText.reduce((summ, instruction) => {
    const [a, b] = instruction[0].slice(4, -1).split(',')
    summ += a * b
    return summ
}, 0)

console.log(result)