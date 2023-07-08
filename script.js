import Entity from "./Entity.js";
import Health from "./components/Health.js";
import HealthSystem from "./systems/HealthSystem.js";
import Dimension from "./components/Dimension.js";
import Position from "./components/Position.js";
import Movement from "./components/Movement.js";
import MovementSystem from "./systems/MovementSystem.js";
import Gun from "./components/Gun.js";
import ShootingSystem from "./systems/ShootingSystem.js";
import RenderSystem from "./systems/RenderSystem.js";

const entities = {}

// player
const entity = new Entity()

entity.addComponent(new Health())

entity.addComponent(new Dimension())

entity.addComponent(new Position({
    x: 200,
    y: 200
}))

entity.addComponent(new Movement)

entities[entity.id] = entity

// enemy
const enemy = new Entity()

enemy.addComponent(new Health())

enemy.addComponent(new Dimension())

enemy.addComponent(new Position({
    x: 700,
    y: 200
}))

entities[enemy.id] = enemy

// gun
const gun = new Entity()

gun.addComponent(new Dimension({
    width: 50, height: 10
}))

gun.addComponent(new Position({
    x: 220,
    y: 220,
}))

gun.addComponent(new Movement())

gun.addComponent(new Gun())

entities[gun.id] = gun

const healthSystem = new HealthSystem(entities)

const movementSystem = new MovementSystem(entities)

const shootingSystem = new ShootingSystem(entities)

const renderSystem = new RenderSystem(entities)

movementSystem.listen()

shootingSystem.listen()

update()

function update() {
    movementSystem.movePlayer()

    shootingSystem.updateBullet()

    renderSystem.render()

    requestAnimationFrame(update)
}
