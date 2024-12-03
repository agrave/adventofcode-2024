const fs = require('fs')

const rawContent = fs.readFileSync('./day03/input.txt', { encoding: 'utf8' })

const enabledInstructions = /((do\(\)|^).+?(don't\(\)|$))/g
const instructionTemplate = /mul\(\d{1,3},\d{1,3}\)/g

const lines = rawContent.split('\r\n')

const enabled = lines.reduce((acc,line)=>{
    const enabled =[...line.matchAll(enabledInstructions)].flatMap(item=>item[0])
    acc.push(...enabled)
    return acc
},[])

console.log(enabled)

const parsedText = enabled.reduce((text,enabled)=>{

    const instructions = [...enabled.matchAll(instructionTemplate)].flatMap(item=>item[0])
    // console.log(instructions.length)
    text.push(...instructions)
    return text
},[])

    // console.log(parsedText)


const result = parsedText.reduce((summ, instruction) => {
    const [a, b] = instruction.slice(4, -1).split(',')
    summ += a * b
    return summ
}, 0)

console.log(result)