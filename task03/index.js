const fs = require('fs')
const { getDistance } = require('./distance')
const { random } = require('./random')
const MIN = 0
const MAX = 100

/*
    Решение можно улучшить, использовав не линейный поиск, а бинарный. Не было времени переделать.
 */

const start = () => {
    const randPoint = {x: random(MIN, MAX), y: random(MIN, MAX), z: random(MIN, MAX)}
    //const randPoint = {x: 10, y: 0, z: 0}
    let point = {x: 0, y: 0, z: 0}
    let searchPoint = []
    let calls = 0

    let isEqualPoint = false

    console.log(randPoint)

    while (!isEqualPoint) {

        let dist1 = getDistance(randPoint, point)

        point.x = point.x + 1
        let dist2 = getDistance(randPoint, point)

        if (dist1 < dist2) {
            point.x--
            isEqualPoint = true

        }

        searchPoint[calls] = {x: point.x, y: point.y, z: point.z}
        calls++
    }

    isEqualPoint = false
    while (!isEqualPoint) {

        let dist1 = getDistance(randPoint, point)

        point.y = point.y + 1
        let dist2 = getDistance(randPoint, point)

        if (dist1 < dist2) {
            point.y--
            isEqualPoint = true

        }
        searchPoint[calls] = {x: point.x, y: point.y, z: point.z}
        calls++
    }

    isEqualPoint = false
    while (!isEqualPoint) {

        let dist1 = getDistance(randPoint, point)

        point.z = point.z + 1
        let dist2 = getDistance(randPoint, point)

        if (dist1 < dist2) {
            point.z--
            isEqualPoint = true

        }
        searchPoint[calls] = {x: point.x, y: point.y, z: point.z}
        calls++
    }
    calls = calls - 3
    const result = {
        "result": {
            "random_point": {x: randPoint.x, y: randPoint.y, z: randPoint.z},
            "search_points": searchPoint,
            "calls": calls
        }
    }

    console.log(result)

    fs.writeFileSync('result.json', JSON.stringify(result))
}

start()