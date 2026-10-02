const fs = require("fs/promises")
const path = require("path")

const databaseFile = path.join(__dirname, "db.json")

const loadData = async () => {
    try {
        const content = await fs.readFile(databaseFile, "utf-8")
        return JSON.parse(content)
    } catch (error) {
        return {
            error: `found error on reading file ${error}`
        }
    }
}

const readWithDelay = async () => {
    await new Promise((resolve) => {
        setTimeout(resolve, 5000)
    })

    return loadData()
}

const saveData = (data) => {
    return fs.writeFile(
        databaseFile,
        JSON.stringify(data, null, 2)
    )
}

module.exports = {
    delayReadData: readWithDelay,
    writeIntoFile: saveData
}