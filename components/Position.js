export default class Position {
    constructor(value) {
        this.name = "position"
        this.value = {
            x: value.x || 50,
            y: value.y || 50
        }
    }
}