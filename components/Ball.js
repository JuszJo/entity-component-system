export default class Ball {
    constructor(value) {
        this.name = "ball"
        this.radius = value
        this.forward = true
        this.angle = 0
        this.speedX = 5
        this.speedY = 5
        this.maxSpeed = 10
    }
}