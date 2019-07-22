let TrafficCone = function (image, x, y, speed, width, height) {

    this.image = image;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = width;
    this.height = height;


    this.moveDown = function () {
        this.y = this.y + this.speed;
    }

    this.setSpeed = function (newSpeed) {
        this.speed = newSpeed;
        return this.speed;
    }

    this.drawCone = function (canvas) {

        let ctx = canvas.getContext("2d");
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

}