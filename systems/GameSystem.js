export default class GameSystem {
    constructor(number, entities) {
        this.loop = number
        this.entities = entities
        this.end = false
    }

    updateNumber(number) {
        this.loop = number
    }

    listen() {
        for(const id in this.entities) {
            const currentEntity = this.entities[id]

            if(currentEntity.components.lose) {
                this.endGame(currentEntity)

                this.end = true
            }
        }
    }

    endGame() {
        cancelAnimationFrame(this.loop)
    }
}