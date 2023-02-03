// file system fs dosya islemler yapmak icin kullanilan core moduldur
// nodejs icerisinde hazir gelen moduller core modul olarak adlandirilir
// console da bir core moduldur ancak calisma ortamina aktarmamiza gerek yoktur
// bunun nedeni console gibi moduller global olarak tanimlanmistir
// bu sayede ice aktarilmadan direkt olarak kullanilibilir
// global.console calisir ancak global.fs calismaz
const fs = require('fs')

// fs icerisinde sync ve normal versiyonlar bulunur
// normal versiyonlar asenkron sekilde calisir
// bu yuzden yapilan dosya islemleri ayni anda calisir sirali calismaz
// isini once bitiren istenileni yapar


// console.log(fs)

// DOSYA OKUMAK
// readfile ile okunur
// param1 dosya adi ve yolu
// param2 karakter kodlamasi
// param3 callbak
fs.readFile('03-file.txt', 'utf8', (err, data) => {
    // hata varsa hatanini gosterilmesi
    if (err) throw err
    // yoksa dosya iceriginin gosterilmesi saglandi
    console.log(data)
})


// DOSYA YAZMAK
// write file ile dosya yazilir
// param1 dosya adi ve yolu
// param2 dosya icerigi
// param3 karakter kodlamasi
// param4 callbak
fs.writeFile('03-write-file.txt', 'dosya olusturuldu ve icerigi yazdirildi', (err) => {
    if (err) throw err
    console.log('dosya yazdirildi')
})

fs.writeFile('03-write-json-file.json', '{"name": "suleyman", "age": 21}', 'utf8', (err) => {
    if (err) throw err
    console.log('json dosyasi olusturuldu')
})


// VERI EKLEMEK
// appendfile ile eklenir
// param1 dosya yolu
// param2 eklenecek icerik
// param3 karaketer kodlamasi
// param4 callbak
fs.appendFile('03-write-file.txt', '\nyeni veri eklendi', 'utf8', (err) => {
    if (err) throw err
    console.log('veri eklendi')
})


// DOSYA SILMEK
// param1 dosya yolu
// param2 callback
// fs.unlink('03-write-file.txt', (err) => {
//     if (err) throw err
//     console.log('dosya silindi')
// })


// KLASOR OLUSTURMAK
// param1 olusturulacak klasorler
// param2 true oldugunda eger klasor yok ise ust klasor de olusturulur
// param3 callback
// fs.mkdir('olusturulanklasor/altklasor', { recursive: true }, (err) => {
//     if (err) throw err
//     console.log('klasor olusturuldu')
// })


// KLASOR SILMEK
// param1 silinmesi istenen klasor
// param2 eger silinmezse hard sekilde silinmesi
// bunun nedeni icerisin farkli klasor ya da dosyalarin olmasidir
// param3 callback
fs.rmdir('olusturulanklasor', { recursive: true }, (err) => {
    if (err) throw err
    console.log('klasorler silindi')
})