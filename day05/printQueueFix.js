const fs = require('fs')

const rawContent = fs.readFileSync('./day05/input.txt', { encoding: 'utf8' })

const [rulesRaw, pagesRaw] = rawContent.split('\r\n\r\n')

const rules = rulesRaw.split('\r\n').map(rule => rule.split('|').map(x => parseInt(x)))
const pages = pagesRaw.split('\r\n').map(page => page.split(',').map(x => parseInt(x)))

const numberInTheMiddle = arr => arr[Math.trunc(arr.length / 2)]

const sortByRules = (arr, rules) => {
    let isChanged
    
    do {
        isChanged = true

        for (const rule of rules) {
            const first = arr.indexOf(rule[0])
            const second = arr.indexOf(rule[1])

            if (second < first) {
                const num = arr[first]
                arr.splice(first, 1)

                arr.splice(second, 0, num)
                isChanged = false
            } 
        }
    } while (!isChanged)
    return arr
}

const fixed = pages.map(order => {

    const applicableRules = []
    let isMisordered = false

    for (const rule of rules) {
        const first = order.indexOf(rule[0])
        const second = order.indexOf(rule[1])

        if (first === -1 || second === -1) {
            // rule is not applicable
            continue
        } else {
            // rule is applicable
            applicableRules.push(rule)
            // do not succed the rule
            if (second < first) {
                isMisordered = true
            }
        }
    }

    if (isMisordered) {
        const x = sortByRules(order, applicableRules)
        return numberInTheMiddle(x)
    } else {
        return 0
    }

})




const res = fixed.reduce((summ, order) => {
    summ += order
    return summ
}, 0)



console.log(res)