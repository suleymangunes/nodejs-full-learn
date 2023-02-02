// let ile degisken tanimlandi
// process ile calisma ortamindaki islerle ilgili bilgi alindi
// dosya calistirilinca node dosyaadi param1 param2 seklinde parametreler input olarak tanimlanabilir
// bu degerler process argv listesine atanir slice ile de 2. elemandan sonraki elemanlar alinir
// bu sayede yaricap degeri disardan alinmis oldu
let yaricap = process.argv.slice(2)

// yaricapile alan hesaplayan fonksiyon tanimlandi
function alanHesapla(yaricap) {
    let alan = 3.14 * yaricap * yaricap
    console.log('yaricapi ' + yaricap + ' olan dairenin alani: ' + alan)
}

console.log(yaricap)

// fonksiyon cagrilarak parametre olarak disardan alinan deger tanimlandi
alanHesapla(yaricap)