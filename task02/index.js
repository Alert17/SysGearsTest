const command = require('./entry_data/file.json')

start = () => {

    /*
        Я решил быстрее всего обработать максимум ошибок входного файла будет
        регулярное выражение. Возможно не самое лучшее решение.
    */

    const regExp = /^({"data":\[)({"user":"(([a-zA-Z\d_-]+\.)*[a-zA-Z\d_-]+@[a-z\d_-]+(\.[a-z\d_-]+)*\.[a-z]{2,6})","rating":(\d{1,2}|100),"disabled":(true|false)(})(,|]))*(,"condition":{"(exclude|include)(":\[{")(user|rating|disabled)(":)(true|false|\d{1,2}|100|(([a-zA-Z\d_-]+\.)*[a-zA-Z\d_-]+@[a-z\d_-]+(\.[a-z\d_-]+)*\.[a-z]{2,6}))(}],"sort_by":\["([a-z]{3,8})("\]}))})$/
    const commandStr = JSON.stringify(command)

    if (!commandStr.match(regExp)) {
        return console.log("Wrong entry file")
    }

    const data = command.data

    // Модифицируемая часть, условие может содержать не только include/exclude

    let condFromFile
    let isInclude = false
    if (command.condition.exclude) {
        condFromFile = command.condition.exclude
    } else if  (command.condition.include) {
        condFromFile = command.condition.include
        isInclude = true
    }


    const sortCondFromFile = command.condition.sort_by

    const condition = condFromFile[Object.keys(condFromFile)[0]]
    const sortCondition = sortCondFromFile[Object.keys(sortCondFromFile)[0]]

    let resObject = {result: []}

    // Выполняем условие, которое получаем. Пока обрабатывает только include и exclude,
    // объекты которые подходят по условию добавляем в результирующий массив
    for (let i = 0; data[i]; i++) {
        if (isInclude) {
            if (data[i][Object.keys(condition)[0]] === Object.values(condition)[0])
            resObject.result.push(data[i])
        } else {
            if (data[i][Object.keys(condition)[0]] !== Object.values(condition)[0])
                resObject.result.push(data[i])
        }
    }

    // Результат сортируем по условию сортировки
    resObject.result.sort((a, b) => {
        if (a[sortCondition] < b[sortCondition])
            return -1

        if (a[sortCondition] > b[sortCondition])
            return 1

        return 0
    })

    console.log(resObject)
}

start()