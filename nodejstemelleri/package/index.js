// package birden fazla modulun bir arada bulunup ayni amac icin hizmet ettikleri is kolaylastiran yapilardir.
// package.json ile paket indirelelbilir ve tum islemler kontrol edilebilir
// npm init ile package.json dosyasi olusturulur - -y ile sorularn sorular varsayilan olarak kabul edilir
// package.json dosyasi icinde start ile baslatilmasi istenen dosya secilebilr bu sayede npm start ile proje baslatilabilir
// npm install ya da npm i ile istenilen paket projeye dahil edilebilir
// npm uninstall ile istenilen paket kaldirilabilir
// ayni zaman package.json dosyasinda depencendies kismina da paket ismi yazilarak
// npm install denildiginde yazilan paketler dogrudan indirilir
// bu sayede proje paylasildiginda sadece kodlar ve bu dosyalarin gonderlimesi yeterlidir

// yuklenen paket calisma ortamina require ile dahil edilebilir
const moment = require('moment')

// paket fonksiyonlarina direkt olarak artik ulasilabilir
console.log(moment().format())

