// async ile fonksiyonun javascriptin varsayilan olarak gelen senkron yapisi 
// asenkrona donusturulur
// await ile istenilen metot beklenir ve onun arka planda calismasi beklenir

// parametre olarak data alan promise fonksiyon tanimlanid
function getData(data) {
    return new Promise((resolve, reject) => {
        // fonksiyon calistigi ilk an veriler alinmaya baslandi
        console.log('veriler alinmaya calisiliyor...')

        // eger gelen veri dogru ise resolve yanlis ise rejectin calismasi saglandi
        if (data) {
            resolve('veriler alindi')
        }
        else {
            reject('veriler alinamadi')
        }
    })
}

// ayni sekilde calisan ve verileri temizleyen fonksiyon tanimlandi
function cleanData(receivedData) {
    return new Promise((resolve, reject) => {
        console.log('veriler duzenleniyor...')

        if (receivedData) {
            resolve('veriler duzenlendi')
        }
        else {
            reject('veriler duzenlenmedi')
        }
    })
}

// bu iki fonksiyon promise'in sagladigi then ve catch ile calistirildi

// getData(true)
//     .then((value) => {
//         console.log(value)
//         cleanData(true).then((value) => {
//             console.log(value)
//         }).catch((error) => {
//             console.log(error)
//         })
//     }).catch((error) => {
//         console.log(error)
//     })

// ancak bu sekilde ulasmak icice oldugundan kafa karistirir
// bu yuzden okunusu daha kolay olan async await yapisi tercih edilmektedir


// async await ile yeniden cagirma
// async ile fonksiyona asenkron ozelligi kazandirildi
async function veriAl() {
    // hata tespiti icin try catch bloklari kullanilir
    try {
        // await ile bir is bitene kadar bekler
        const receivedData = await getData(true)
        console.log(receivedData)
        const cleanedData = await cleanData(false)
        console.log(cleanedData)
        // hata bulunursa yapilacaklar ayarlandi
    } catch (error) {
        console.log(error)
    }
}

// veriAl()


// kitap orneginin async await ile tekrarlanmasi

const kitaplar = [
    { name: 'kitap 1', author: 'yazar 1' },
    { name: 'kitap 2', author: 'yazar 2' },
    { name: 'kitap 3', author: 'yazar 3' },
]

const kitaplariListele = () => {
    kitaplar.map(kitap => {
        console.log(kitap.name)
    })
}

const kitapEklemek = (yeniKitap) => {

    const promiseKitap = new Promise((resolve, reject) => {
        reject('bir hata olustu')
        kitaplar.push(yeniKitap)
        resolve(kitaplar)
    })

    return promiseKitap
}

// async, await ve try-catch ile kitap eklenip durumlar kontrol edildi
async function kitapEkle() {
    try {
        await kitapEklemek({ name: 'kitap 12', author: 'yazar 12' })
        kitaplariListele()
    } catch (error) {
        console.log(error)
    }
}

// kitapEkle()


// await bekler

// fonksiyona async ile asenkron ozelligi kazandirildi
async function istekGonder() {
    // let ile promise icin degisken tanimlandi
    // new promise ile promise nesnesi ozelligi kazandirildi
    // sonuc olarak resolve ve reject alarak callbak fonksiyon ile calismasi saglandi
    let promiseIstek = new Promise((resolve, reject) => {
        // 2 saniye bekledikten sonra resolve calismasi saglandi
        setTimeout(() => {
            resolve('istek gonderildi')
        }, 3000);
    })
    let result = 'adfaf'
    console.log(result)
    console.log(promiseIstek)
    // await ile promiseistek bekletildi ve isi bitmeyene kadar calismamasi saglandi
    // asenkron oldgu icin usttek console log calisti ancak kendi fonksiyonu calisana kadar bekledi ve sonra calistirdi
    result = await promiseIstek;
    console.log(result)

}

istekGonder()