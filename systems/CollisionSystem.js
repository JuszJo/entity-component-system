import Collision from "../components/Collision.js"

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

        let ballEntity = null
        let playerEntity = null

        let ball = null
        let player = null

        this.collidables.forEach(entity => {
            if(entity.components.ball) {
                ballEntity = entity

                ball = {
                    x: entity.components.position.value.x,
                    y: entity.components.position.value.y,
                    width: entity.components.dimension.value.width,
                    height: entity.components.dimension.value.height,
                }
            }
            else {
                playerEntity = entity

                player = {
                    x: entity.components.position.value.x,
                    y: entity.components.position.value.y,
                    width: entity.components.dimension.value.width,
                    height: entity.components.dimension.value.height,
                }
            }
        })

        if(
            ball.x + ball.width > player.x &&
            ball.y + ball.height > player.y &&
            ball.x < player.x + player.width &&
            ball.y < player.y + player.height

        ) {

            if(ballEntity.components.ball.forward) {
                ballEntity.components.ball.forward = false

                for(const id in this.entities) {
                    const currentEntity = this.entities[id]

                    if(currentEntity.name == "player2") {
                        currentEntity.removeComponent("collision")
                    }
                    if(currentEntity.name == "player1") {
                        currentEntity.addComponent(new Collision())
                    }
                }
            }
            else {
                ballEntity.components.ball.forward = true
                
                for(const id in this.entities) {
                    const currentEntity = this.entities[id]
                    
                    if(currentEntity.name == "player1") {
                        currentEntity.removeComponent("collision")
                    }
                    if(currentEntity.name == "player2") {
                        currentEntity.addComponent(new Collision())
                    }
                }
            }
        }
    }
}