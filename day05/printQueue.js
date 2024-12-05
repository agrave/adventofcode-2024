const fs = require('fs')

const rawContent = fs.readFileSync('./day05/input.txt', { encoding: 'utf8' })

const [rulesRaw, pagesRaw] = rawContent.split('\r\n\r\n')

const rules = rulesRaw.split('\r\n').map(rule => rule.split('|').map(x => parseInt(x)))
const pages = pagesRaw.split('\r\n').map(page => page.split(',').map(x => parseInt(x)))

const rightOrder = pages.filter(order => {
    for (const rule of rules) {
        const first = order.indexOf(rule[0])
        const second = order.indexOf(rule[1])

        if (first === -1 || second === -1) {
            // rule is not applicable
            continue
        } else {
            // rule is applicable
            // do not succed the rule
            if (second < first) {
                return false
            }
        }
    }
    return true

})

const res = rightOrder.reduce((summ, order) => {
    summ += order[Math.trunc(order.length / 2)]
    return summ
}, 0)

console.log(res)