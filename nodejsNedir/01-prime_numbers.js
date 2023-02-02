// const ile degisken tanimlanir 
// process nodejs çalışma ortaminda çalisan islerle ilgili bilgi icerir
// slice listeden girilen parametreden sonraki elemanlarla yeni liste olusturur
const arguments = process.argv.slice(2)

// function ile fonksiyon olusturulur
function primeNumbers(lowNumber, highNumber) {
    // let ile degisken tanimlanir
    for (i = lowNumber; i <= highNumber; i++) {
        // ancak degisken tanimlamak icin let kullanimi zorunlu degildir
        isPrime = true
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                isPrime = false
            }
        }
        if (isPrime) {
            console.log(i)
        }
    }
}

// js'te stringin icerisi integer ise int e cevirmek icin sayi ile carpmak yeterlidir
primeNumbers(arguments[0] * 1, arguments[1] * 1)

console.log(process.argv.slice(2))
