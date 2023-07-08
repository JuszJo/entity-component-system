import Entity from "./Entity.js";
import Health from "./components/Health.js";
import HealthSystem from "./systems/HealthSystem.js";
import Dimension from "./components/Dimension.js";
import Position from "./components/Position.js";
import Movement from "./components/Movement.js";
import MovementSystem from "./systems/MovementSystem.js";
import Gun from "./components/Gun.js";
import ShootingSystem from "./systems/ShootingSystem.js";
import Ball from "./components/Ball.js";
import RenderSystem from "./systems/RenderSystem.js";

const entities = {}

// player
// // const entity = new Entity()

// // entity.addComponent(new Health())

// // entity.addComponent(new Dimension())

// // entity.addComponent(new Position({
// //     x: 200,
// //     y: 200
// // }))

// // entity.addComponent(new Movement)

// entities[entity.id] = entity

// enemy
// const enemy = new Entity()

// enemy.addComponent(new Health())

// enemy.addComponent(new Dimension())

// enemy.addComponent(new Position({
//     x: 700,
//     y: 200
// }))

// entities[enemy.id] = enemy

// gun
// const gun = new Entity()

// gun.addComponent(new Dimension({
//     width: 50, height: 10
// }))

// gun.addComponent(new Position({
//     x: 220,
//     y: 220,
// }))

// gun.addComponent(new Movement())

// gun.addComponent(new Gun())

// entities[gun.id] = gun

// player1
const player1 = new Entity()

player1.addComponent(new Position({
    x: 1,
    y: 200
}))

player1.addComponent(new Dimension({
    width: 10,
    height: 50
}))

player1.addComponent(new Movement())

entities[player1.id] = player1

// player2
const player2 = new Entity()

player2.addComponent(new Position({
    x: 790,
    y: 200
}))

player2.addComponent(new Dimension({
    width: 10,
    height: 50
}))

player2.addComponent(new Movement())

entities[player2.id] = player2

// ball
const ball = new Entity("ball") 

ball.addComponent(new Position({
    x: 18,
    y: 225
}))

ball.addComponent(new Dimension({
    width: 5,
    height: 5
}))

ball.addComponent(new Movement())

ball.addComponent(new Ball(10))

entities[ball.id] = ball

const healthSystem = new HealthSystem(entities)

const movementSystem = new MovementSystem(entities)

const shootingSystem = new ShootingSystem(entities)

const renderSystem = new RenderSystem(entities)

movementSystem.listen()

shootingSystem.listen()

addEventListener("keydown", e => {
    if(e.key == "Enter") {
        update()
        
        ball.removeComponent("movement")
    }
})

function update() {
    movementSystem.movePlayer()

    shootingSystem.updateBall()

    renderSystem.render()

    requestAnimationFrame(update)
}
