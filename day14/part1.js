const fs = require('fs')

const rawContent = fs.readFileSync('./day14/input.txt', { encoding: 'utf8' })

const W = 101
const H = 103

const robots = rawContent.split('\r\n').map(str => {
    const [x, y, vX, vY] = str.match(/-?\d+/g).map(Number)
    return { x, y, vX, vY }
})

const positionOver = seconds => {
    return robots.map(robot => {
        let x, y

        x = (robot.x + robot.vX * seconds) % W
        if (x < 0) x = W * Math.abs(Math.trunc(x / W) + 1) + x


        y = (robot.y + robot.vY * seconds) % H
        if (y < 0) y = H * Math.abs(Math.trunc(y / H) + 1) + y

        return { ...robot, x, y }
    })
}

const calculateQuadrants = (map) => {
    // console.log(map)
    const w = Math.trunc(W / 2)
    const h = Math.trunc(H / 2)
    const quadrants = map.reduce((agg, robot) => {
        if (robot.x < w && robot.y < h) agg.topLeft.push(robot)
        if (robot.x > w && robot.y < h) agg.topRight.push(robot)
        if (robot.x < w && robot.y > h) agg.bottomLeft.push(robot)
        if (robot.x > w && robot.y > h) agg.bottomRight.push(robot)
        return agg
    }, { topLeft: [], topRight: [], bottomLeft: [], bottomRight: [] })

    // console.log(quadrants)
    return quadrants.topLeft.length * quadrants.topRight.length * quadrants.bottomLeft.length * quadrants.bottomRight.length
}

const res = calculateQuadrants(positionOver(100))

console.log(res)