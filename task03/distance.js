const getDistance = (pointA, pointB) => {
    return ((pointB.x-pointA.x)**(2)+(pointB.y-pointA.y)**(2)+(pointB.z-pointA.z)**(2))**(1/2)
}

module.exports = { getDistance }