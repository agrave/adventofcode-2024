const fs = require('fs')

const rawContent = fs.readFileSync('./day12/input.txt', { encoding: 'utf8' })

const garden = rawContent.split('\r\n').map(x => x.split(''))
const regions = []

const postToStr = (x, y, t) => {
    if (t) return `${x}|${y}|${t}`
    return `${x}|${y}`
}

const unvisited = new Set()
for (let y = 0; y < garden.length; y++) {
    for (let x = 0; x < garden[y].length; x++) {
        unvisited.add(postToStr(x, y, garden[y][x]))
    }
}

function findRegionArea(x, y, t) {
    const regionArea = []

    regionArea.push(postToStr(x, y))
    unvisited.delete(postToStr(x, y, t))

    if (unvisited.has(postToStr(x + 1, y, t))) regionArea.push(...findRegionArea(x + 1, y, t))
    if (unvisited.has(postToStr(x - 1, y, t))) regionArea.push(...findRegionArea(x - 1, y, t))
    if (unvisited.has(postToStr(x, y + 1, t))) regionArea.push(...findRegionArea(x, y + 1, t))
    if (unvisited.has(postToStr(x, y - 1, t))) regionArea.push(...findRegionArea(x, y - 1, t))
    return regionArea
}

unvisited.forEach(point => {
    const [x, y, t] = point.split('|')

    regions.push({
        type: t,
        area: new Set(findRegionArea(parseInt(x), parseInt(y), t))
    })
})

const result = regions.reduce((total, region) => {
    let horizontalUpSide = 0, horizontalDownSide = 0, verticalLeftSide = 0, verticalRightSide = 0

    region.area.forEach((value, key, set) => {
        const [x, y] = value.split('|').map(e => parseInt(e))

        // horizontalUpSide
        if (!set.has(postToStr(x, y - 1))) {
            let a = 2
            if (set.has(postToStr(x + 1, y)) && !set.has(postToStr(x + 1, y - 1))) a--
            if (set.has(postToStr(x - 1, y)) && !set.has(postToStr(x - 1, y - 1))) a--
            horizontalUpSide += a
        }

        // horizontalDownSide
        if (!set.has(postToStr(x, y + 1))) {
            let a = 2
            if (set.has(postToStr(x + 1, y)) && !set.has(postToStr(x + 1, y + 1))) a--
            if (set.has(postToStr(x - 1, y)) && !set.has(postToStr(x - 1, y + 1))) a--
            horizontalDownSide += a
        }

        // verticalLeftSide
        if (!set.has(postToStr(x - 1, y))) {
            let a = 2
            if (set.has(postToStr(x, y + 1)) && !set.has(postToStr(x - 1, y + 1))) a--
            if (set.has(postToStr(x, y - 1)) && !set.has(postToStr(x - 1, y - 1))) a--
            verticalLeftSide += a
        }

        // verticalRightSide
        if (!set.has(postToStr(x + 1, y))) {
            let a = 2
            if (set.has(postToStr(x, y + 1)) && !set.has(postToStr(x + 1, y + 1))) a--
            if (set.has(postToStr(x, y - 1)) && !set.has(postToStr(x + 1, y - 1))) a--
            verticalRightSide += a
        }

    })

    const sides = (horizontalUpSide + horizontalDownSide + verticalLeftSide + verticalRightSide) / 2
    total += sides * region.area.size
    console.log('sides', sides, 'size', region.area.size)
    return total
}, 0)

console.log(result)
