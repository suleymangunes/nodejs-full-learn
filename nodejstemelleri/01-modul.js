// require ile dosya ismi yazilarak icerisindeki fonksiyon alinir
// genellikle ayni isimde yeni bir degiskene tanimlanir
const evenOrOdd = require('./00-test-odd-even')

// bu sekilde de import edilebilir
// import evenOrOdd from './00-test-odd-even.js'
// export default evenOrOdd

// bu degisken artik ice aktarilan fonksiyonu ifade eder
// bu fonksiyon uzerinden islem yapilabilir
evenOrOdd(2)

// eger birden fazla fonksiyon export edilmisse yine ayni sekilde degiskene atanir
// ya da istenirse obejct destructuring yontemiyle parcalanip kullanilabilir
const iletisim = require('./00-test-2-func-export')

// bu degisken uzerinden fonksiyonlara erisilir
iletisim.sayGoodbye()
iletisim.sayHello()
