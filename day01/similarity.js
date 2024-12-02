const { count } = require('console')
const fs = require('fs')

const rawContent = fs.readFileSync('./day01/input.txt', { encoding: 'utf8' })

const { left, right } = rawContent.split('\r\n').filter(Boolean)
    .reduce((acc, item) => {
        const [left, right] = item.split('   ')
        acc.left.push(left)
        acc.right.push(right)
        return acc
    }, { left: [], right: [] })

const rightCount = right.reduce((count, item) => {
    if (!count[item]) { count[item] = 1 } else { count[item] += 1 }
    return count
}, {})

const similarity = left.reduce((similarity, item) => {
    const multiplayer = rightCount[item] ? rightCount[item] : 0
    similarity += item * multiplayer;
    return similarity
}, 0)

console.log(similarity)