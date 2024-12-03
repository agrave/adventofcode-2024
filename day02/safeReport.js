const fs = require('fs')

const rawContent = fs.readFileSync('./day02/input.txt', { encoding: 'utf8' })

const content = rawContent.split('\r\n').filter(Boolean)
    .reduce((acc, item) => {
        const report = item.split(' ')
        acc.push(report)
        return acc
    }, [])


const safeReports = content.reduce((safeCount, report) => {
    const vector = (prev, next) => next - prev > 0 ? 'asc' : 'desc'
    let safeReport = true
    let vectorReport = vector(report[0], report[1])

    for (let i = 1; i < report.length; i++) {
        const diff = Math.abs(report[i - 1] - report[i])
        const currVector = vector(report[i - 1], report[i])


        if (diff < 1 || diff > 3 || currVector !== vectorReport) {
            safeReport = false
            break
        }
    }



    safeCount += safeReport ? 1 : 0
    return safeCount
}, 0)

console.log(safeReports)
