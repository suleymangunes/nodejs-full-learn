// bir fonksiyon calismasini tamamladiktan sonra baska bir fonksiyonun calismasini 
// saglayan fonksiyonlara callback fonksiyon denir.
// callback fonksiyonlar bir fonksiyona parametre olarak gonderilirler.

// javascript yapisi geregi senkron bir sekilde calisir
console.log("senkron calisan 1. kod satiri")
console.log("senkron calisan 2. kod satiri")
console.log("senkron calisan 3. kod satiri")
console.log("senkron calisan 4. kod satiri")

// fonksiyon olusturuldu
const func1 = () => {
    console.log('func1 tamamlandi')
}

const func2 = () => {
    console.log('func2 tamamlandi')
}

func1()
func2()

// single thread ile calisir
// her seferde tek bir is yapar

// x'e 5 degerini atar ve ekranda x'i yazdirir
let x = 5
console.log('1. gelen veri:', x)

// 5 saniye bekleyip daha sonra x'i 5 artirarak ekrana yazdirir
setTimeout(() => {
    x = x + 5
    console.log('2. gelen veri:', x)
}, 000);  // normalde milisaniye degeri vardir ancak asagidaki kodlarla zaman etkilesimi yasanmamasi icin 0 olarak tanimlanidi

// x'i 5 artirir ve ekrana yazdirir
x = x + 5
console.log('3. gelen veri:', x)
// sonuc olarak timeout ile olan islem bekletilir ve sonraki satirlar calistirildiktan sonra
// time out bitince icerisindeki kodlar calistirilir
// bu sekilde bir fonksiyonun icerisinde baska bir fonksiyon barindirip durum sonucunda islem yaptirmasi callback fonksiyonu ile yapilir


// daha detayli bir bakir

// liste olusturuldu ve icerik olarak sozluk yapisinda degerler tanimlandi
const books = [
    { name: 'kitap 1', author: 'yazar 1' },
    { name: 'kitap 2', author: 'yazar 2' },
    { name: 'kitap 3', author: 'yazar 3' },
]

// kitap listesini mape donusturen yapi olusturuldu
const listBooks = () => {
    // map yapmak icin map metotu icerisinde parametre olarak eleman kullanilir
    // => {} ile eleman ile ilgili yapilacaga karar verilir
    books.map(book => {
        console.log(book)
    })
}

// listbooks fonksiyonu ile ekranda mapin gosterilmesi saglandi
listBooks()

// kitap eklemek icin fonksiyon olusturuldu
const addBook = (newBook, callback) => {
    // push ile listeye eleman eklendi 
    // ancak her defasinda bu degisikligin gorunmesi icin listbooks fonksiyonunun yeniden cagrilmasi gerekcekti
    // bu yuzden parametre olarak listbooks fonksiyonu alindi ve islem bittikten sonra direkt olarak cagrilmasi saglandi
    // yapilan bu fonksiyon cagirma islemin callback denir
    books.push(newBook)
    callback()
}

// kitap eklendigi anda fonksiyonun calistirilmasi saglandi
// bu kisida addbook higher order function (yüksek seviyeli fonksiyon alarak tanimlanirken)
// listbooks parametre olarak cagrildigi ve yüksek seviyeli is bitince calistirildigi icin callback function (cagrilan fonksiyon )
// olarak tanimlanir
addBook(
    { name: 'kitap 4', author: 'yazar 4' }, listBooks
)
