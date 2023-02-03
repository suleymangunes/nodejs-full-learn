// core modul olan http calisma ortamina aktarildi
const http = require('http')

// http modulu uzerinden server olusturuldu ve request response ile callback olusturuldu
const server = http.createServer((req, res) => {

    // request ile url e ulasildi
    const url = req.url;
    console.log(url)

    // istek gonderilince konsolda gosterilmesi saglandi
    console.log('istek gonderildi')
    // tarayicida gonderilen isten sonucu donen response ile ekran ciktisi gosterilmesi saglandi

    if (url === '/') {
        // head icerigi yazildi bu sayede bu islem olunca 200 basarili kodu gonderildi
        res.writeHead(200, { 'Content-Type': 'text/html' })
        // ancak bu cikti response bitirilince saglanacaktir
        res.write('<h1>INDEX SAYFASI</h1>')
    }
    else if (url === '/about') {
        res.write('ABOUT SAYFASI')
    }
    else if (url === '/contact') {
        res.write('CONTACT SAYFASI')
    }
    else {
        // writehead ile istenilenin disinda girilince hata olmasi saglandi
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.write('<h1>404 SAYFAS BULUNAMADI</h1>')
    }
    res.end()
    // sonuc olarak tek bir request olmasina ragmen iki tane gonderiliri
    // bunun nednei favionu da otomatik olarak cagirmasidir (varsayilan)

});

// port olusturuldu
const port = 3000

// serverin istenilen portta calismasi saglandi
server.listen(port, () => {
    // server baslatilinca konsolda bilgilendirilmesi saglandi
    console.log(`sunucu port ${port}'de baslatildi`)
})
