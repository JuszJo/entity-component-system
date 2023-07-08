export default class CollisionSystem {
    constructor(entities) {
        this.entities = entities
        this.collidables = []
    }

    checkCollisions() {
        this.collidables.splice(0)

        for(const id in this.entities) {
            const currentEntity = this.entities[id]

            if(currentEntity.components.collision) {
                this.collidables.push(currentEntity)
            }
        }

        let ballMain = null
        let objectMain = null

        let ball = null
        let object2 = null

        this.collidables.forEach(entity => {
            if(entity.components.ball) {
                ballMain = entity

                ball = {
                    x: entity.components.position.value.x,
                    y: entity.components.position.value.y,
                    width: entity.components.dimension.value.width,
                    height: entity.components.dimension.value.height,
                }
            }
            else {
                objectMain = entity

                object2 = {
                    x: entity.components.position.value.x,
                    y: entity.components.position.value.y,
                    width: entity.components.dimension.value.width,
                    height: entity.components.dimension.value.height,
                }
            }
        })

        if(
            ball.x + ball.width > object2.x &&
            ball.y + ball.height > object2.y &&
            ball.x < object2.x + object2.width &&
            ball.y < object2.y + object2.height

        ) {
            ballMain.components.ball.forward = false
        }
    }
}