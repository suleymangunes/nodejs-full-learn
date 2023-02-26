console.log("merhaba");

// kaydolma sayfasinda girilen bilgilerin sayfa gecisi yapildiginda tekrar gorunmesi istenebilir
// bu gibi durumlarda verilerin saklanması gerekir
// bunun icin cookiler kullanilmaktaydi ancak 4kb gibi dusuk boyutu ve guvenlik acigi olusturdugu icin local storage uretilmistir
// localstorage ile islemler yapilir sadece islem yapilan domain icerisinde kaydetme islemi yapar
// veriler localstorage icerisinde tutulur
// set item ile veriler kaydedilir key value seklinde
localStorage.setItem("myitem", "keddy");

// get item ile veriler alinir
let item = localStorage.getItem("myitem");

// remove ile kaldirma islemi yapilirs
localStorage.removeItem("myitem", "keddy");

// kaldirildiktan sonra tekrar ornek alindi
let item2 = localStorage.getItem("myitem");

// item1 remove islemi yapilmadan tanimlandigi icin verilerini tuttu
console.log(item);
// item2 ile veriler kaldırıldıktan sonra ornek alindi ve veriler silindi
console.log(item2);

// json formatinda bilgi olusturuldu
let user = { username: "suleyman", isactive: true };

// setitem ile json bilgi gonderildi ancak jsonstrinhfy ile gonderildi
// bu sekilde gonderilmeseydi obje olarak gonderilecekti, stringe cevirlid
localStorage.setItem("userinfo", JSON.stringify(user));

// daha sonra veri cekilerek okundu
let userInfo = localStorage.getItem("userinfo");

// daha sonra parse edilerek json verilerin json formatinda okunabilmesi saglandi
userInfo = JSON.parse(userInfo);

console.log(userInfo);
