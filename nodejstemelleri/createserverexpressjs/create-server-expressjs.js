// express nodejs uzerine yazilmis bir web catisidirs
// express icin oncelikle npm init ile package.json dosyasi olusturulup 
// npm projeye initial edildi
// daha sonra npm install express ile paket ice aktraildi
// require ile projede kullanilmasi saglandi
const express = require('express')

// express fonsiyonu degiskene atandi
const app = express()

// get olusturuldu ve callbak ile request response kullanima hazir hale getirildi
app.get('/', (req, res) => {
    // status ile http durum kodu belirtildi
    res.status(200).send('welcome to index page')
})

app.get('/about', (req, res) => {
    res.status(200).send('welcome to about page')
})

app.get('/contact', (req, res) => {
    res.status(200).send('welcome to contact page')
})

// geri kalan tum sayfalar icin hata verilmesi saglandi
app.get('*', (req, res) => {
    res.status(404).send('page was not found')
})

// port olusturuldu
const port = 3000

// port uzerinden server baslatildi
app.listen(port, () => {
    console.log('server olusturuldu')
})
