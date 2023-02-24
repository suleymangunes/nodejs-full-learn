// decision structures
let price = "102";

// == esitse
console.log(price == 1);
console.log(price == 100);

// === hem esitse hem turu ayniysa
console.log(price === 1);
console.log(price === 100);

// != esit degilse

// < kucukse <= kucuk esitse > buyukse >= buyuk esitse

// && ve
// || veya
// ! degil

// kosul yapisi
if (price > 101) {
  console.log("price 100 den buyuk");
} else if (price == 101) {
  console.log("price 100 e esit");
} else {
  console.log("price 100 den kucuk");
}

// switch
switch (price) {
  case 102:
    console.log("pricedan buyuk sayi girildi");
    break;
  case 101:
    console.log("pricedan kucuk sayi girildi");
    break;
  default:
    console.log("pricea esit sayi girildi");
    break;
}

// ternary operator
let dogru = true;
let sonuc = dogru ? "sonuc dogru" : "sonuc yanlis";
console.log(sonuc);
