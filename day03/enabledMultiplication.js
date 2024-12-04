const fs = require('fs')

const rawContent = fs.readFileSync('./day03/input.txt', { encoding: 'utf8' })

const instructionTemplate = /mul\(\d{1,3},\d{1,3}\)/g

let line = rawContent
const start = "don't()"
const end = 'do()'

let isEnabled = true
let position
let enabledLines = []

do {
    if (isEnabled) {
        position = line.indexOf(start)
        enabledLines.push(line.slice(0, position))
        line = line.slice(position)
        isEnabled = false

    } else {
        position = line.indexOf(end)
        line = line.slice(position)
        isEnabled = true
    }
} while (position !== -1)

const instuctions = enabledLines.reduce((text, enabled) => {

    const instructions = [...enabled.matchAll(instructionTemplate)].flatMap(item => item[0])
    text.push(...instructions)
    return text
}, [])


const result = instuctions.reduce((summ, instruction) => {
    const [a, b] = instruction.slice(4, -1).split(',')
    summ += a * b
    return summ
}, 0)

console.log(result)