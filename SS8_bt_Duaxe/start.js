let CAR_X = 500;
let CAR_SPEED = 10;
let CAR_WIDTH = 100;
let CAR_HEIGHT = 100;
let CAR_FUEL = 2000;

let CONE_Y = 5;
let CONE_WIDTH = 50;
let CONE_HEIGHT = 50;

let FUEL_Y =5;
let FUEL_SPEED = 3;
let FUEL_WIDTH = 30;
let FUEL_HEIGHT = 30;
let FUELPLUS = 20;

let BIRD_X =0;
let BIRD_SPEED =5;
let BIRD_WIDTH = 50;
let BIRD_HEIGHT =50;
let BIRD_SCORE =100;


let canvas = document.getElementById('canvasId');

console.log('asdasdasd');
console.log('canvas.width: ' + canvas.width);
let midWidth = (canvas.width / 2) - 70;

//tạo ảnh để vẽ!
let imgCar = document.getElementById('carId');
let imgCone = document.getElementById('coneId');
let imgFuel = document.getElementById('fuelId');
let imgBang = document.getElementById('bangId');
let imgBird1 = document.getElementById('bird1Id');
let endGame = document.getElementById('endId');

let img1 = document.getElementById('road1Id');
let img2 = document.getElementById('road2Id');
let img3 = document.getElementById('road3Id');

// Khai báo các biến
let car = new Car(imgCar, midWidth, CAR_X, CAR_SPEED, false, false, CAR_WIDTH, CAR_HEIGHT, CAR_FUEL);
let ctx = canvas.getContext("2d");
ctx.font = '16px Arial';
ctx.fillStyle = "red";

let count = 1;
let j = 0;
let h = 0;
let shootBirdIndex = 0;
let level = 67;
let newSpeed = 3;
let miniSpeed = 0;
let mutilCone = [];
let mutilFuel = [];
let mutilBird = [];
let score = 0;
let sumScore = 0;


//Vẽ đường chuyển động:
function drawRoad() {


    if (count < 10) {
        ctx.drawImage(img1, 0, 0);
    } else if (count < 20) {
        ctx.drawImage(img2, 0, 0);
    } else if (count < 30) {
        ctx.drawImage(img3, 0, 0);
    } else {
        ctx.drawImage(img1, 0, 0);
        count = 0;
    }

    count++;
}// Đây là đoạn cần cải tiến!!!! vẽ thế này quá mất công, nên cho vào 1 mảng và từ lần sau gọi mảng ra (tạo ảnh git bằng mảng)

drawRoad();
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
    let randomX = Math.round(Math.random() * 300) + 300;
    let cone = new TrafficCone(imgCone, randomX, CONE_Y, newSpeed, CONE_WIDTH, CONE_HEIGHT);
    mutilCone.push(cone);
}

// Tao 1 fuel:
function createFuel() {
    let randomX = Math.round(Math.random() * 300) + 300;
    let fuel = new Fuel(imgFuel, randomX, FUEL_Y, FUEL_SPEED, FUEL_WIDTH, FUEL_HEIGHT, FUELPLUS);
    mutilFuel.push(fuel);
}

//tạo 1 Bird:
function createBird() {
    let randomY = Math.round(Math.random() * 400) + 50;
    let bird = new Bird(imgBird1, imgBang, BIRD_X, randomY, BIRD_SPEED, BIRD_WIDTH, BIRD_HEIGHT, BIRD_SCORE);
    mutilBird.push(bird);
}


//Move Road & Cone & Car
function move() {

    clearCanvas();
    drawRoad();

//tang level:
    if (j % level == 0) {
        createCone();
        h = Math.round(Math.random() * 30);
        let birdRandom = Math.round(Math.random() * 10);

        if (h % 21 == 0) {
            createFuel();
            console.log('Fuel Out');
        }
        if (birdRandom % 5 == 0) {
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
    ctx.fillText("FUEL: " + car.getFuelLevel(), 10, 20);

    //fuel:
    for (let k = 0; k < mutilFuel.length; k++) {
        mutilFuel[k].moveFuel();
        mutilFuel[k].drawFuel(canvas);
        if (car.fuel < 2001) {
            car.plusFuel(mutilFuel[k]);
        }

    }

    //cone
    for (let i = 0; i < mutilCone.length; i++) {
        mutilCone[i].setSpeed(newSpeed);
        mutilCone[i].moveDown();
        mutilCone[i].drawCone(canvas);
        car.hitCar(mutilCone[i]);
    }

    //bird
    for (let m = 0; m < mutilBird.length; m++) {
        mutilBird[m].moveBird();
        mutilBird[m].drawBird(canvas);
        //console.log('toa do x: ' + mutilBird[m].x);
        shootBirdIndex = m;
    }

    car.drawCar(canvas);

    j++;
    showScore();
    end();
}

//Đếm thời gian của road và Car!
let runGame = setInterval(move, 10);

//Show Score
function showScore() {
    let score2 = Math.round(j / 10);
    sumScore = score + score2;
    ctx.fillText('SCORE: ' + sumScore, 900, 20);
    console.log('sumScore: ' + sumScore);
    console.log('score2: ' + score2);
    console.log('score: ' + score);
    //score = 0;
}

function showCoords(event) {
    let x = event.clientX;
    let y = event.clientY;
    let coords = "X coords: " + x + ", Y coords: " + y;
    console.log(coords);
    let shootedIndex = shootBirdIndex;
    console.log('shootedIndex: ' + shootedIndex);
    console.log('mutilBird[shootedIndex].x: ' + mutilBird[shootedIndex].x)

    if (x < (mutilBird[shootedIndex].x + 50) && mutilBird[shootedIndex].x < x) {
        if (y < mutilBird[shootedIndex].y + 50 && mutilBird[shootedIndex].y < y) {
            console.log('SHOOT!!!!!!')

            mutilBird[shootedIndex].drawBangBird(canvas);
            score += 100;
        }
    }
}


// //shoot bird
// function shootBird() {
//     console.log('SHOOT!!!!!!')
//     let shootedIndex = shootBirdIndex;
//     score += 100; // shoot plus score
//     ctx.fillText('SCORE: ' + score, 900, 20);
//     mutilBird[shootedIndex].drawBangBird(canvas);
// }

//EndGame
function end() {
    if (car.hit == true) {
        ctx.drawImage(endGame, 0, 0);
        ctx.font = '30px Arial';
        ctx.fillText(' YOUR SCORE IS: ' + sumScore, 370, 150);
        clearInterval(runGame);
    }
}

//Xóa canvas:
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}