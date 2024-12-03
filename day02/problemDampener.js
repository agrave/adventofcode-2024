const fs = require('fs')

const rawContent = fs.readFileSync('./day02/input.txt', { encoding: 'utf8' })

const content = rawContent.split('\r\n').filter(Boolean)
    .reduce((acc, item) => {
        const report = item.split(' ')
        acc.push(report)
        return acc
    }, [])


const safeReports = content.reduce((safeCount, report) => {
    let safeReport = true
    let dampener = 1

    const isSafe = arr => {
        const vector = (prev, next) => next - prev > 0 ? 'asc' : 'desc'

        let initialVector = vector(arr[0], arr[1])

        for (let level = 1; level < arr.length; level++) {
            const diff = Math.abs(arr[level - 1] - arr[level])
            const currVector = vector(arr[level - 1], arr[level])

            if (diff < 1 || diff > 3 || currVector !== initialVector) return level

        }
        return -1

    }

    let unsafePos = isSafe(report)

    if (unsafePos !== -1) {
        const firstFail = [...report]
        const secondFail = [...report]
        const removeFirst = [...report]
        
        firstFail.splice(unsafePos, 1)
        secondFail.splice(unsafePos - 1, 1)
        removeFirst.splice(0, 1)

        if (isSafe(firstFail) === -1 || isSafe(secondFail) === -1 || isSafe(removeFirst) === -1 ) {
            unsafePos = -1
        }

    }


    safeCount += unsafePos === -1 ? 1 : 0
    return safeCount
}, 0)

console.log(safeReports)
