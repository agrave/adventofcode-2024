const fs = require('fs')

const rawContent = fs.readFileSync('./day14/input.txt', { encoding: 'utf8' })

const W = 11
const H = 7

const robots = rawContent.split('\r\n').map(str => {
    const [x, y, vX, vY] = str.match(/-?\d+/g).map(Number)
    return { x, y, vX, vY }
})

const positionOver = seconds => {
    return robots.map(robot => {
        let x, y

        if (robot.vX >= 0) {
            x = (robot.x + robot.vX * seconds) % W
        } else {
            x = W + (robot.x + robot.vX * seconds) % W
        }

        if (robot.vY >= 0) {
            y = (robot.y + robot.vY * seconds) % H
        } else {
            y = H + (robot.y + robot.vY * seconds) % H
        }
        return { ...robot, x, y }
    })
}




console.log(robots)