import Entity from "../Entity.js"
import Bullet from "../components/Bullet.js"
import Dimension from "../components/Dimension.js"
import Position from "../components/Position.js"

let shoot = false

export default class ShootingSystem {
    constructor(entities) {
        this.entities = entities
    }

    listen() {
        for(const id in this.entities) {
            const currentEntity = this.entities[id]

            if(currentEntity.components.gun) {
                addEventListener('keydown', e => {
                    const key = e.code

                    if(key == "Space") {
                        shoot = true
                        console.log("Shoot");

                        // this.updateBall()

                        // this.createBullet(currentEntity.components.position.value)
                    }
                })
            }
        }
    }

    updateBall() {
        for(const id in this.entities) {
            const currentEntity = this.entities[id]

            if(currentEntity.components.ball) {
                if(currentEntity.components.ball.speedY < 0) {
                    currentEntity.components.ball.angle *= -1
                }
                
                let angle = currentEntity.components.ball.angle * Math.PI / 180

                if(currentEntity.components.ball.forward) {
                    const x = Math.cos(angle)
                    const y = Math.sin(angle)

                    currentEntity.components.position.value.x += (x * currentEntity.components.ball.speedX)
                    currentEntity.components.position.value.y += (y * currentEntity.components.ball.speedY)
                }
                else {
                    const x = Math.cos(-angle)
                    const y = Math.sin(-angle)
                    
                    currentEntity.components.position.value.x -= (x * currentEntity.components.ball.speedX)
                    currentEntity.components.position.value.y -= (y * currentEntity.components.ball.speedY)
                }                
            }
        }
    }

    createBullet(value) {
        if(shoot) {
            const bullet = new Entity()
    
            bullet.addComponent(new Dimension({
                width: 10,
                height: 10
            }))
    
            bullet.addComponent(new Position({
                x: value.x + 50,
                y: value.y
            }))

            bullet.addComponent(new Bullet())
    
            this.entities[bullet.id] = bullet
        }
    }

    updateBullet() {
        for(const id in this.entities) {
            const currentEntity = this.entities[id]

            if(currentEntity.components.bullet) {
                currentEntity.components.position.value.x += 5

                if(currentEntity.components.position.value.x > 700) {
                    currentEntity.removeComponent("dimension")
                    currentEntity.removeComponent("position")
                    currentEntity.removeComponent("bullet")
                }
            }
        }
    }
}