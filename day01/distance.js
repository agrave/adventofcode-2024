const fs = require('fs')

const rawContent = fs.readFileSync('./day01/input.txt', { encoding: 'utf8' })

const { left, right } = rawContent.split('\r\n').filter(Boolean)
    .reduce((acc, item) => {
        const [left, right] = item.split('   ')
        acc.left.push(left)
        acc.right.push(right)
        return acc
    }, { left: [], right: [] })

left.sort()
right.sort()

let summ = 0
for (let i = 0; i < left.length; i++) {
    summ += Math.abs(left[i] - right[i])
}

console.log(summ)