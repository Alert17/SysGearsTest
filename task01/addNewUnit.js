const fs = require('fs')


const addNewUnit = (command, units, unitFileName) => {

    if (!command.ratio) {
        return console.log("Value cannot be zero")
    }

    const newUnit = {
        "unit": command.unit,
        "value": command.ratio
    }

    let isUsable = false

    units.units.forEach(el => {
        if (el.unit === newUnit.unit) {
            isUsable = true
        }
    })

    if (!isUsable) {
        units.units.push(newUnit)
        fs.writeFileSync(unitFileName, JSON.stringify(units))
        console.log("Successful")
    } else {
        console.log("This unit is already in use")
    }
}


module.exports =  { addNewUnit }