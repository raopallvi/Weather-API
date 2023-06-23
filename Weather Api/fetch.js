let inputBox = document.querySelector('#weather input');
let temp = document.querySelector('#temp-span span');
let wind = document.querySelector('#wind span');
let desc = document.querySelector('#description span');
let clouds = document.querySelectorAll('.cloud-div');
let bolts = document.querySelectorAll('.bolt');
let sun = document.getElementById('sun');
var thunderSound = new Audio('thunder.mp3')
let box = document.getElementById('weather');

inputBox.addEventListener('keydown', (event) => {
    if (event.keyCode == 13) {
        setValue(inputBox.value);
        inputBox.value = "";
    }
});


function setValue(city) {
    let response = fetch(`https://goweather.herokuapp.com/weather/${city}`);
    response.then((value) => {
        // we cannot use value.method(text, json) more than one time
        return value.json();
    }).then((data) => {
        if (data.message != "NOT_FOUND" || data != "404 page not found") {
            temp.innerHTML = data.temperature;
            wind.innerHTML = data.wind;
            desc.innerHTML = data.description;
            console.log(data);
        }
        else shakeButton();
    })
    // .catch((error) => {
    //     // catch is useless here
    //     // fetch actually works in this way 
    //     // it always resolves the promise
    //  so use .ok property instead 
    //     console.log(error);
    // })
}


function shakeButton() {
    temp.innerHTML = "No data";
    wind.innerHTML = "No data";
    desc.innerHTML = "";
    let count = 0;
    let intervalId = setInterval(() => {
        count++;
        if (count % 2) {
            document.querySelector('div').style.marginLeft = "-10px"
        }
        else {
            document.querySelector('div').style.marginLeft = "0px"
        }
        if (count == 6) {
            clearInterval(intervalId);
        }
    }, 100);
}
"asd".substring()
// getting a response is a 2 stage process

// ------------------------------ MOVING THE CLOUDS ----------------------------------------------------
setInterval(() => {
    for (let i of clouds) {
        let x = i.getBoundingClientRect().left;
        let width = i.getBoundingClientRect().width;
        i.style.left = (x - 5) + "px";
        if (x - 5 + width <= 0) {
            i.style.left = innerWidth + width + "px";
        }
    }

}, 50);

let sunValue = 0;
let sv = 4;
setInterval(() => {
    sun.style.boxShadow = `0px 0px ${sunValue}px 250px rgb(243, 207, 0)`;
    sunValue += sv;
    if (sunValue >= 800) {
        sv = -4;
    }
    if (sunValue <= 100) sv = 1;
}, 10);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function light() {
    let i = getRandomInt(3);
    bolts[i].style.height = "150px";
    bolts[i].style.width = "150px";
    setTimeout(() => {
        bolts[i].style.height = "0px";
        bolts[i].style.width = "0px";
    }, 2000);
}
setInterval(() => {
    light();
    shakeBox();
    thunderSound.play();
}, 12000);

// ------------------------------ SHAKE THE BOX ---------------------------

function shakeBox() {
    let count = 0;
    let deg = 70;
    let intervalId = setInterval(() => {
        if (count % 2) {
            box.style.transform = "rotateX(" + -deg + "deg)";
        }
        else {
            box.style.transform = "rotateX(" + deg + "deg)";
            deg /= 2;
        }
        count++;
        if (Math.floor(deg) == 0) {
            box.style.transform = "rotateX(" + 0 + "deg)";
            clearInterval(intervalId);
        }
    }, 200);
}