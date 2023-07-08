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

                        this.createBullet(currentEntity.components.position.value)
                    }
                })
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