// prompt ile girdi
let name = prompt("isminizi girin: ");

// id ile elemente ulasma ismi guncelleme
let isim = document.getElementById("isim");
isim.innerHTML = name;

// id ile elemente ulasip tarihi guncelleme
let tarih = document.getElementById("tarih");
tarih.innerHTML = Date();
