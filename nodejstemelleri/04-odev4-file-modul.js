const fs = require('fs')

// CRUD
// create
fs.writeFile('04-employees.json', '{"name": "Employee 1 Name", "salary": 2000}', 'utf8', (err) => {
    if (err) throw err
    console.log('dosya olusturuldu')
})

// read
fs.readFile('04-employees.json', 'utf8', (err, data) => {
    if (err) throw err
    console.log(data)
})

// update
fs.appendFile('04-employees.json', '\ndosya guncellendi', 'utf8', (err) => {
    if (err) throw err
    console.log('dosya guncellendi')
})

// delete
fs.unlink('04-employees.json', (err) => {
    if (err) throw err
    console.log('dosya silindi')
})
