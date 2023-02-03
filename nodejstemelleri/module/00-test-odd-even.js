// nodejs ortaminda her javascript dosyasi bir modul olarak dusunulebilir
// bu yuzden her dosyada belirli islemler yapilarak modulerlik saglanabilir
// hata daha kolay bulunur daha esnek kod yazilir ve gelistirme daha kolay olur

// icerisinde yalnizda girilen sayinin tek mi cift mi oldugunu bulan program
function evenOrOdd(sayi) {
    if (sayi % 2 == 0) {
        console.log('sayi cifttir')
    }
    else {
        console.log('sayi tektir')
    }
}

function selamVer() {
    console.log('merhaba')
}

// modulun diger dosyalar tarafinda kullanilmasina izin vermek icin export edilir
// sadece istenilen fonksiyon adi ile istenilen fonksiyon export edilmis olur
module.exports = evenOrOdd

// birden fazla fonksiyon export edilmek istenirse bu durumda alt alta hepsi yazilabilir
// yada module.exports = {} listesi icerisinde fonksiyon isimleri belirtilebilir
