// dom document object model programlarin ve komut dosyalarinin bir belgenin icerigine yapisina
// ve stiline dinamik olarak erismesine ve guncellenmesine izin veren bir arayüzdur

// documan uzerinden dosyanin yolu
// console.log(document.location);
// dosyanin html body icerigi
// console.log(document.body);
// aktif elemn degeri
// console.log(document.activeElement);
// dokuman uzerinden arka plan rengi degistirildi
document.body.style.backgroundColor = "aqua";

// id degerine gore titlerin bulunmasi saglandi
let title = document.getElementById("title");
// titler uzerinden icerisindeki yazinin degistirilmesi saglandi
title.innerHTML = "title degerini degistirimd";
console.log(title.innerHTML);

let link = document.querySelector("ul#link>li>a");
// renk degistirildi
link.style.color = "red";
console.log(link.innerHTML);

// prompt ile disardan girdi alinir
// let fullName = prompt("lutfen adinizi giriniz");
// console.log(fullName);

// id ile element bulundu
let greeting = document.getElementById("greeting2");
// element icerigine disardan alinan girdi eklendi
// greeting.innerHTML = `${greeting.innerHTML} <small>${fullName}</small>`;

// liste icerigine erismek
// liste elemanina erisildi
let lastChild = document.querySelector("ul#link>li:last-child");
console.log(lastChild);
// link id degerine sahip ul ye ulasildi
let ulDom = document.querySelector("ul#link");
// createelement ve li ile liste olusturuldu
let liDom = document.createElement("li");
// liste icerigi degistirildi
liDom.innerHTML = "eklenen liste elemani";
ulDom.prepend(liDom);

// classlist
// classlist ile elementin class listesine erisildi
let karsilama = document.querySelector("#greeting");
// class lsitesine class ekleme istelmi yapildi
karsilama.classList.add("text-primary");
// remove ile kaldirma islemi yapilir
console.log(karsilama.classList);
