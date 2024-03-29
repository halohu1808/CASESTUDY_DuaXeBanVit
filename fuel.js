let Fuel = function (image, x,y,speed,width,height,fuel) {

    this.image = image;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.fuel = fuel;

    this.moveFuel =function () {
        this.y = this.y + this.speed;
    }
    this.setFuelLevel = function (newFuel) {
        this.fuel += newFuel;
        return this.fuel;
    }

    this.setSpeed = function (newSpeed) {
        this.speed = newSpeed;
        return this.speed;
    }

    this.drawFuel = function (canvas) {

        let ctx = canvas.getContext("2d");
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }


}