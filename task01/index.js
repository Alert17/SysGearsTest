// Конвертація між одиницями відстані
const { convert } = require('./convert')
const { addNewUnit } = require("./addNewUnit");

const UNIT_FILE_NAME = "./entry_data/units.json"
const COMMAND_FILE_NAME = "./entry_data/file.json"

const units = require(UNIT_FILE_NAME)
const command = require(COMMAND_FILE_NAME)

const start = () => {

    if (!units || !command)
        return console.log("Error with configuration files")

    const regExpForNewUnit = /^({"unit":")([a-z]{1,3})(","ratio":)((\d{1,5})(\.\d{1,4})?)(})$/
    const regExpForConvert = /^({"distance":{"unit":")([a-z]{1,3})(","value":)((\d{1,5})(\.\d{1,4})?)(},"convert_to":"([a-z]{1,3})("}))$/

    const commandStr = JSON.stringify(command)

    if (commandStr.match(regExpForConvert)) {
        const result = convert(command, units.units)
        console.log(result === -1 ? "Error" : result)
    } else if (commandStr.match(regExpForNewUnit)) {
        addNewUnit(command, units, UNIT_FILE_NAME)
    } else {
        console.log("Wrong command file")
    }
}

start()
//{"distance": {"unit": "m", "value": 0.5}, "convert_to": "ft"}
//{"unit": "yd", "ratio": 0.9144 }