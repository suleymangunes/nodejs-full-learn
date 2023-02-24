// vari le istenen turde degisken tanimlanabilir
// ancak yeni yontemde var kullanilmamaktadir
// var function scope tur fonksiyonda tanimli degerlere disardan ulasilamaz
// ancak bloklarda tanimlanmis degerelere disardan ulasilabilir
var variableWithVar = 5;
console.log(variableWithVar);

// let ile istenen turde veri tanilanabilir
// let block scoptur blok disindan erisilemez
let variableWithLet;
variableWithLet = "let ile tanimlanmis degisken";
// let ile tanimlanmis degisken icerigi degistirilebilir
variableWithLet = "icerik guncellendi";
console.log(variableWithLet);

// not: javascript yorumlanan bir dildir bu yuzden kod siralamasi onemlidir

// const ile istenilen turde degisken tanimlanabilir ancak const degistirilmez
// const icerigi uygulama ayaga kaldirilirken tanimlanir ve degismesine izin vermez
// const ile tanimlanan degisken icerigi bos olamaz
// const block scopeta tanimlidir
const varWithConst = "const icerigi";
console.log(varWithConst);

// arithmetic operators
let counter = 10;
counter++;
counter--;
counter *= 10;
counter /= 10;
console.log(counter);

// boolean
let isExist = true;
console.log(isExist);
console.log(Boolean(""));

// typeof ile verinin turune erisilir
// diger kontroller integer sayi, isinfinite sonluluk, isnan not a number
// sadece is nan true saglar nan a karsi
console.log(typeof 36);

// type coercion
console.log(typeof String(123));

// template literals
var bilgi = `counter ${counter} degerindedir`;
console.log(bilgi);

// some string methods
let karakterdizisi = "bu bir karakter dizisidir";
// lentght ile uzunluk
console.log(karakterdizisi.length);
// indexof ile aranan karakterin indexi
// ilk buldugunu dondurur lastindexof sonuncuyu dondurur
console.log(karakterdizisi.indexOf("k"));
// serach ile index aarama
console.log(karakterdizisi.search("bir"));
// slice ile parca alinir
// replace ile karakter dizisi degistirilir
// touppercase ile buyuk harf lower ile kucuk harf donusturme islemi yapilir
// concat ile iki metin birlestirirlir
// include dahillik kontrolu
// startwith ile basladi mi endswith ile bitti
