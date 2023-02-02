// bir fonksiyon tamamlandiginda ilgili geri donuc icin callback fonksiyon bize guzel bir cozum sunar
// ancak callback ile sonucu bekleriz 
// promise ise istenilen durum olunca istenilen eylemin yapilmasini
// istenilen durum olmayinca ise hata eylemi gibi eylemin yapilmasini saglayan yapidiri

// promise bir islemin sonucunu temsil eden bir javascript nesnesidir
// resolve ve reject adinda iki parametre alir - olumlu resolve - olumsuz reject
// promise yapisinin olumlu sonuclar then olumsuz sonuclari ise catch ile tespit edilir

const promise1 = new Promise((resolve, reject) => {
    // promise soz verir ve en basta olan parametreye gore sonucu dondurur
    // yani basta resolve varsa devaminda reject olsa dahi bastakini alarak resolve oldugunu belirtir
    resolve('calisti')
    reject('hata olustu')
})

// console.log(promise1)

promise1
    .then(value => {
        console.log(value)
    })
    .catch(error => {
        console.log(error)
    })


// daha detayli bir ornek

// kitap listesi tanimlandi
const books = [
    { name: 'kitap 1', author: 'yazar 1' },
    { name: 'kitap 2', author: 'yazar 2' },
    { name: 'kitap 3', author: 'yazar 3' },
]

// listeyi mapleyerek ekran ciktisi saglayan fonksiyon tanimlandi
const listBooks = () => {
    books.map(book => {
        console.log(book.name)
    })
}

// kitap eklemek icin fonksiyon olusturuldu
const addBook = (newBook) => {

    // promise yapisi olusturuldu
    const promise2 = new Promise((resolve, reject) => {
        reject('bir hata olustu')
        // books.push(newBook)
        // resolve(books)
    })

    // promise yapisinin fonksiyon cagrilinca calismasi icin return edildi
    return promise2
}

// kitap eklemek icin fonksiyon cagrildi
addBook(
    { name: 'kitap 4', author: 'yazar 4' }
)
    // eger hata yok ise yapilacaklar then kisminda tanimlandi
    .then(value => {
        console.log('kitap eklendi')
        listBooks()
    })
    // eger hata var ise yapilacaklar catch kisminda tanimlandi
    .catch(error => {
        console.log('kitap eklenemedi')
        listBooks()
    })