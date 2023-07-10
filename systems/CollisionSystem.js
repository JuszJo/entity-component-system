import Collision from "../components/Collision.js"
import MovementSystem from "./MovementSystem.js"

export default class CollisionSystem {
    constructor(entities) {
        this.entities = entities
        this.collidables = []
    }

    checkWallCollision() {
        for(const id in this.entities) {
            const currentEntity = this.entities[id]

            const entity = {
                x: currentEntity.components.position.value.x,
                y: currentEntity.components.position.value.y,
                width: currentEntity.components.dimension.value.width,
                height: currentEntity.components.dimension.value.height,
                name: currentEntity.name
            }

            if(entity.name == "ball") {
                if(entity.y - entity.height / 2 < 0) {
                    currentEntity.components.position.value.y = entity.height / 2
                    currentEntity.components.ball.speedY *= -1
                }
                else if(entity.y + entity.height / 2 > 600) {
                    currentEntity.components.position.value.y = 600 - entity.height / 2
                    currentEntity.components.ball.speedY *= -1
                }
                else if(entity.x - entity.width / 2 < 0) {
                    console.log("player 1 loses");
                    currentEntity.components.lose = true;
                }
                else if(entity.x + entity.width / 2 > 800) {
                    console.log("player 2 loses");
                    currentEntity.components.lose = true;
                }
            }
            else {
                if(entity.y < 0) {
                    currentEntity.components.position.value.y = 0
                }
                else if(entity.y + entity.height > 600){
                    currentEntity.components.position.value.y = 600 - entity.height
                }
            }
        }
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
            ball.x + ball.width / 2 > player.x &&
            ball.y + ball.height / 2 > player.y &&
            ball.x - ball.width / 2 < player.x + player.width &&
            ball.y - ball.height / 2 < player.y + player.height
        ) {
            const half = player.height / 2 + player.y

            const dif = ball.y - half

            // if(dif < 0) {
            //     // console.log("top", dif);
            // }
            // else if(dif > 0) {
            //     // console.log("bottom", dif);
            // }

            const angle = (dif / 25) * 30

            ballEntity.components.ball.angle = angle

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

            // increase ball speed on every bounce
            MovementSystem.increaseBallSpeed(ballEntity)
        }
    }
}