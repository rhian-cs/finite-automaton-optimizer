const fs = require('fs')

function readAutomatonFromFile(directory) {
  try {
    const data = fs.readFileSync(directory, 'utf8')

    return JSON.parse(data)
  } catch(error) {
    console.error(`Error reading file '${directory}' from disk: ${error}`)
  }
}

module.exports = { readAutomatonFromFile }
