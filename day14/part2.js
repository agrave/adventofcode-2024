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

const makeCanvas = (robots) => {

    const canvas = new Array(H).fill('.'.repeat(W)).map(x => x.split(''))
    robots.forEach(robot => {
        const { x, y } = robot
        if (canvas[y][x] === '.') {
            canvas[y][x] = 1
        } else {
            canvas[y][x] += 1
        }
    });
    return canvas
}

const print = (canvas) => console.log(canvas.map(x => x.join('')).join('\r\n'))

for (let i = 0; i < 100_000; i++) {
    let xMasTree = false
    const canvas = makeCanvas(positionOver(i))

    const isRobot = (val) => val !== '.'

    for (let y = 0; y < H - 10; y++) {
        for (let x = 0; x < W; x++) {
            if (
                isRobot(canvas[y][x]) &&
                isRobot(canvas[y + 1][x]) &&
                isRobot(canvas[y + 2][x]) &&
                isRobot(canvas[y + 3][x]) &&
                isRobot(canvas[y + 4][x]) &&
                isRobot(canvas[y + 5][x]) &&
                isRobot(canvas[y + 6][x]) &&
                isRobot(canvas[y + 7][x])
            ) {
                console.log('seconds:', i)
                print(canvas)
                console.log('seconds:', i)
                xMasTree = true
                break
            }
        }
        if (xMasTree) break
    }
    if (xMasTree) break
}
