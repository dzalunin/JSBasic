"use strict;"

function farengateTemp(celsiusTemp) {
    return parseFloat(celsiusTemp) * 9 / 5 + 32
}


let temprature = prompt('Input temprature C.');

alert(`It will be ${farengateTemp(temprature)}F`);
