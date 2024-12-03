const fs = require('fs')

const rawContent = fs.readFileSync('./day03/input.txt', { encoding: 'utf8' })

const enabledInstructions = /((do\(\)|^).+?(don't\(\)|$))/g
const instructionTemplate = /mul\(\d{1,3},\d{1,3}\)/g
const forbidenInstructions = /don't\(\).+?do\(\)/g

const lines = rawContent.split('\r\n')

const enabled = lines.map(x => {

    let line = x
    const start = "don't()"
    const end = 'do()'

    let from = -1
    let to = -1

    let mode = true
    let pos
    let e = []

    do {


        if (mode) {
            pos = line.indexOf(start)
            e.push(line.slice(0, pos))
            line = line.slice(pos)
            mode = false

        } else {
            pos = line.indexOf(end)
            line = line.slice(pos)
            mode = true
        }



    } while (pos !== -1)


    // do {
    //     from = line.indexOf(start)
    //     to = line.indexOf(end, from)

    //     console.log(from, to)

    //     if (from >= 0 && to >= 0 && from < to) {
    //         line = line.slice(0, from) + '()-----' + line.slice(to + 2)
    //         console.log('pair')
    //     } else if (from >= 0) {
    //         line = line.slice(0, from)
    //         console.log('single')

    //     }

    // } while (from !== -1)


    console.log(e)
    console.log('-------------------')
    return e.join('()-----()')
})


const parsedText = enabled.reduce((text, enabled) => {

    const instructions = [...enabled.matchAll(instructionTemplate)].flatMap(item => item[0])
    // console.log(instructions.length)
    text.push(...instructions)
    return text
}, [])

// console.log(parsedText)


const result = parsedText.reduce((summ, instruction) => {
    const [a, b] = instruction.slice(4, -1).split(',')
    summ += a * b
    return summ
}, 0)

console.log(result)