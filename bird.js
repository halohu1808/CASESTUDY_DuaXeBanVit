let Bird = function (image, imageShooted, x, y, speed, width, height, score) {

    this.image = image;
    this.imageShooted = imageShooted;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = width;
    this.height = height;
    this.score = score;

    this.moveBird = function () {
        this.x = this.x + this.speed;
    }
    this.setBirdScore = function (newScore) {
        this.score += newScore;
        return this.score;
    }

    this.setBirdSpeed = function (newSpeed) {
        this.speed = newSpeed;
        return this.speed;
    }

    this.drawBird = function (canvas) {

        let ctx = canvas.getContext("2d");
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    this.drawBangBird = function (canvas) {

        let ctx = canvas.getContext("2d");
        ctx.drawImage(this.imageShooted, this.x, this.y, this.width, this.height);
    }


}