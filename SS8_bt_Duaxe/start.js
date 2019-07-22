let CAR_X = 500;
let CAR_SPEED = 10;
let CAR_WIDTH = 100;
let CAR_HEIGHT = 100;
let CAR_FUEL = 1000;

let CONE_Y = 5;
let CONE_WIDTH = 50;
let CONE_HEIGHT = 50;

let FUEL_Y = 5;
let FUEL_SPEED = 3;
let FUEL_WIDTH = 30;
let FUEL_HEIGHT = 30;
let FUEL_PLUS = 20;

let BIRD_X = 0;
let BIRD_SPEED = 5;
let BIRD_WIDTH = 50;
let BIRD_HEIGHT = 50;
let BIRD_SCORE = 100;

const FONT_NAME = 'Russo One';
const FONT_SIZE = '30px';


let canvas = document.getElementById('canvasId');

let midWidth = (canvas.width / 2) - 70;

//tạo ảnh để vẽ!
let imgCar = document.getElementById('carId');
let imgCone = document.getElementById('coneId');
let imgFuel = document.getElementById('fuelId');
let imgBang = document.getElementById('bangId');
let endGame = document.getElementById('endId');
let endGameFuel = document.getElementById('endFuelId');


let imgBird1 = document.getElementById('bird1Id');
let imgBird2 = document.getElementById('bird2Id');
let imgBird3 = document.getElementById('bird3Id');

let img1 = document.getElementById('road1Id');
let img2 = document.getElementById('road2Id');
let img3 = document.getElementById('road3Id');

// Khai báo các biến
let car = new Car(imgCar, midWidth, CAR_X, CAR_SPEED, false, false, CAR_WIDTH, CAR_HEIGHT, CAR_FUEL);
let ctx = canvas.getContext("2d");
ctx.font = FONT_SIZE + ' ' + FONT_NAME;
ctx.fillStyle = "red";

let count = 1;
let j = 60;
let h = 0;
let z = 0;
let shootBirdIndex = 0;
let level = 67;
let newSpeed = 3;
let miniSpeed = 0;
let mutilCone = [];
let mutilFuel = [];
let mutilBird = [];
let arrBird = [];
let mutilRoad = [];
let score = 0;
let sumScore = 0;

//Tạo mảng Road:

for (let i = 0; i < 10; i++) {
    mutilRoad[i] = img1;
}
for (let i = 10; i < 20; i++) {
    mutilRoad[i] = img2;
}
for (let i = 20; i < 30; i++) {
    mutilRoad[i] = img3;
}

//tao mang bird
for (let i = 0; i < 10; i++) {
    arrBird[i] = imgBird1;
}
for (let i = 10; i < 20; i++) {
    arrBird[i] = imgBird2;
}
for (let i = 20; i < 30; i++) {
    arrBird[i] = imgBird3;
}


car.drawCar(canvas);

//Set true false move
document.addEventListener('keyup', function (event) {
    if (event.keyCode == 37) {
        car.isMoveLeft = false;
    } else if (event.keyCode == 39) {
        car.isMoveRight = false;
    }
});

document.addEventListener('keydown', function (event) {
    if (event.keyCode == 37) {
        car.isMoveLeft = true;
    } else if (event.keyCode == 39) {
        car.isMoveRight = true;
    }
});


//Tao 1 cone:
function createCone() {
    let randomX = Math.round(Math.random() * 350) + 300;
    let cone = new TrafficCone(imgCone, randomX, CONE_Y, newSpeed, CONE_WIDTH, CONE_HEIGHT);
    mutilCone.push(cone);
}

// Tao 1 fuel:
function createFuel() {
    console.log('fuel');
    let randomX = Math.round(Math.random() * 350) + 300;
    let fuel = new Fuel(imgFuel, randomX, FUEL_Y, FUEL_SPEED, FUEL_WIDTH, FUEL_HEIGHT, FUEL_PLUS);
    mutilFuel.push(fuel);

}

//tạo 1 Bird:
function createBird() {
    let randomY = Math.round(Math.random() * 400) + 50;
    let bird = new Bird(imgBird1, imgBang, BIRD_X, randomY, BIRD_SPEED, BIRD_WIDTH, BIRD_HEIGHT, BIRD_SCORE);
    mutilBird.push(bird);
}


//Main Road & Cone & Car
function main() {
    clearCanvas();
//tang level:

    if (car.fuel == 250) {
        createFuel();
    }

    if (j % level == 0) {
        createCone();
        h = Math.round(Math.random() * 30);
        let birdRandom = Math.round(Math.random() * 50);

        if (h % 16 == 0) {
            createFuel();
            console.log('Fuel Out');
            console.log('mutilFuel: ' + mutilFuel);
        }
        if (birdRandom % 26 == 0) {
            createBird();
            console.log('Bird Out');
        }
        if (level > 19) {
            level--;
            console.log('level: ' + level);

            if (miniSpeed < 1) {
                miniSpeed = miniSpeed + 0.1;
            } else {
                miniSpeed = 0;
            }
            newSpeed = newSpeed + Math.floor(miniSpeed);
            // console.log('miniSpeed: ' + miniSpeed);
            // console.log('newSpeed: ' + newSpeed);
        }

    }
    //car
    car.moveRight();
    car.moveLeft();
    car.fuelBurn();
    //console.log('car.getFuelLevel(): ' + car.getFuelLevel())

    //Road
    if (z < mutilRoad.length) {
        ctx.drawImage(mutilRoad[z], 0, 0)
        if (z == 29) {
            z = 0;
        }
    }

    //fuel:
    for (let o = 0; o < mutilFuel.length; o++) {
        mutilFuel[o].moveFuel();
        mutilFuel[o].drawFuel(canvas);
        if (car.fuel < 2001) {
            car.plusFuel(mutilFuel[o]);
        }
    }


    //cone
    for (let i = 0; i < mutilCone.length; i++) {
        mutilCone[i].setSpeed(newSpeed);
        mutilCone[i].moveDown();
        mutilCone[i].drawCone(canvas);
        car.hitCar(mutilCone[i]);
        if (i > 10) {
            mutilCone.shift();
        }
    }

    //bird
    for (let m = 0; m < mutilBird.length; m++) {
        mutilBird[m].moveBird();

        mutilBird[m].image = arrBird[z];

        mutilBird[m].drawBird(canvas);
        shootBirdIndex = m;
        if (m > 3) {
            mutilBird.shift();
        }

    }

    car.drawCar(canvas);

    j++;
    z++;
    ctx.fillText("FUEL: " + car.getFuelLevel(), 10, 40);
    showScore();
    end();
}

//Đếm thời gian của road và Car!
let runGame = setInterval(main, 20);

//Show Score
function showScore() {
    let score2 = Math.round(j / 10);
    sumScore = score + score2;
    ctx.fillText('SCORE: ' + sumScore, 820, 40);


}

function showCoords(event) {
    let x = event.clientX;
    let y = event.clientY;
    let coords = "X coords: " + x + ", Y coords: " + y;

    let shootedIndex = shootBirdIndex;

    if (x < (mutilBird[shootedIndex].x + 50) && mutilBird[shootedIndex].x < x) {
        if (y < mutilBird[shootedIndex].y + 50 && mutilBird[shootedIndex].y < y) {
            console.log('SHOOT!!!!!!')

            mutilBird[shootedIndex].drawBangBird(canvas);
            score += 100;

            mutilBird.splice(shootedIndex, 1);
        }
    }
}


// // taget: chua biet lam
// function taget(event) {
//     console.log('******************************************')
//     let x = event.clientX;
//     let y = event.clientY;
//     ctx.drawImage(imgCar,x,y);
// }

//EndGame
function end() {

    if (car.fuel < 0) {
        ctx.drawImage(endGameFuel, 0, 0);
        // ctx.fontSize = '30px';
        ctx.fillText(' YOUR SCORE IS: ' + sumScore, 340, 150);
        clearInterval(runGame);
    }

    if (car.hit == true) {
        ctx.drawImage(endGame, 0, 0);
        // ctx.fontSize = '30px';
        ctx.fillText(' YOUR SCORE IS: ' + sumScore, 370, 150);
        clearInterval(runGame);
    }
}

//Xóa canvas:
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}