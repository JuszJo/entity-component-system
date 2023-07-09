export default class Position {
    constructor(value) {
        this.name = "position"
        this.value = {
            x: value.x || 0,
            y: value.y || 0
        }
    }
}