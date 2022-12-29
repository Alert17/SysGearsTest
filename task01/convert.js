const convert = (command, units) => {

    /*  Чтобы конвертировать длину, мы проводим двойную конвертацию,
        сначала по значению из таблицы units в метры, а потом по той же таблице
        из метров в нужную единицу */

    if (!command.distance.value) {
        console.log("Distance value cannot be zero")
        return -1
    }

    let convertToUnit = -1
    let distanceUnit = -1

    for (let i = 0; i < units.length; i++) {
        if (units[i].unit === command.distance.unit) {
            distanceUnit = i
        }
        if (units[i].unit === command.convert_to) {
            convertToUnit = i
        }
    }

    if (convertToUnit === -1 || distanceUnit === -1) {
        console.log("This unit was not found")
        return -1
    }



    let value = (command.distance.value / units[distanceUnit].value * units[convertToUnit].value).toFixed(2)
    return {
        unit: command.convert_to,
        value: Number(value)
    }
}

module.exports =  { convert }