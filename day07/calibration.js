const fs = require('fs')
const { generateOperators, evaluate } = require('./utils')

const rawContent = fs.readFileSync('./day07/input.txt', { encoding: 'utf8' })

const equations = rawContent.split('\r\n').map(x => {
    const [testValue, numbers] = x.split(': ')
    return {
        testValue: parseInt(testValue),
        numbers: numbers.split(' ').map(n => parseInt(n))
    }
})

// console.log(equations)

const checkEquation = (equation) => {

    const cLength = equation.numbers.length - 1

    let operators = generateOperators(cLength)

    for (const combination of operators) {
        const result = evaluate(equation.numbers, combination)
        if (result === equation.testValue) {
            return result
        }
    }
    return 0
}

const result = equations.map(eq => checkEquation(eq)).reduce((summ, num) => {
    summ += num
    return summ
}, 0)

console.log(result)