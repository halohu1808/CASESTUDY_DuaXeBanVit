let Car = function (image, x, y, speed, isMoveLeft, isMoveRight, width, height, fuel) {
    // thuộc tính: speed, color, xăng, vị trí, kích thước, ảnh

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.isMoveLeft = isMoveLeft;
    this.isMoveRight = isMoveRight;
    this.width = width;
    this.height = height;
    this.fuel = fuel;
    this.image = image;
    this.hit = false;
    this.shootBird = false;


    this.toaDoFunction = function (x, y) {
        let toaDo = x + '-' + y;
        return toaDo;
    }
    this.setSpeed = function (newSpeed) {
        this.speed = newSpeed;
    }

    // Bơm xăng: bổ xăng max sau
    this.fillFuel = function (fuel) {
        this.fuel += fuel;
    }

    this.moveLeft = function () {
        if (270 < this.x && this.isMoveLeft == true) {
            this.x = this.x - this.speed;
        }

    }
    this.moveRight = function () {
        if (this.x < 570 && this.isMoveRight == true) {
            this.x = this.x + this.speed;
        }
    }

    this.fuelBurn = function () {
        this.fuel--;
    }

    this.getFuelLevel = function () {
        return this.fuel;
    }

    this.hitCar = function (TrafficCone) {
        if (this.x < (TrafficCone.x + 20) && TrafficCone.x < this.x + (this.width - 30)) {
            if (this.y < TrafficCone.y && TrafficCone.y < this.y + (this.width - 20)) {
                return this.hit = true;
            }

        }
    }
    this.plusFuel = function (Fuel) {
        if (this.x < (Fuel.x + 20) && Fuel.x < this.x + (this.width - 30)) {
            if (this.y < Fuel.y && Fuel.y < this.y + (this.width - 20)) {
                console.log('!!!!!!!!!!!!plusFuel!!!!!!!!!');
                this.fuel += Fuel.fuel;

            }
        }
    }


    // vẽ canvas: tạo ra 1 bút contex. Tạo canvas.getContext('2d') Sau đó contex.drawimage

    this.drawCar = function (canvas) {

        let ctx = canvas.getContext("2d");

        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }


}