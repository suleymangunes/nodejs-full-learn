console.log("merhaba");
// fonksiyon olusturma
function sayHelloFrom(user) {
  console.log(`${user}'dan merhaba `);
  return `${user} selam verdi`;
}

let user = sayHelloFrom("suleyman");
console.log(user);

// function expression
// javascript bir degiskene fonksiyon atamasina izin verir
// ancak bundan sonra degisken uzerinden erisim yapilir
// ekle ile yapilir topla hata verir
const ekle = function topla(sayi1, sayi2) {
  return sayi1 * sayi2;
};

var sonuc1 = ekle(10, 20);
console.log(sonuc1);

// arrow functions
let func = (par1, par2) => {
  return par1 + par2;
};
var sonuc2 = func(10, 20);
console.log(sonuc2);

// recursion functions - fonksiyonun kendi icinde cagrilmasi
function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * pow(x, n - 1);
  }
}

console.log(pow(2, 3));

// nested functions -- ic ice fonksiyon
function kullanici(isim, soyisim) {
  const tamAd = () => {
    return isim + soyisim;
  };
  console.log(tamAd());
}

kullanici("suleyman", "gunes");

// work with dom
let greeting = document.getElementById("greeting");
// click ile tiklama durumu anlasildi
greeting.addEventListener("click", domClick);
// tiklaninca rengi degisen element
function domClick() {
  this.style.color == "red"
    ? (this.style.color = "black")
    : (this.style.color = "red");
  this.style.color == "red"
    ? console.log("this is red")
    : console.log("this is black");
}
