function circleArea(yariCap) {
    let alan = 3.14 * yariCap * yariCap
    console.log(alan)
}

function circleCircumference(yariCap) {
    let cevre = 2 * 3.14 * yariCap
    console.log(cevre)
}

// tanimlanan fonksiyonlara disardan erisim saglandi
module.exports = {
    circleArea,
    circleCircumference
}
