import Entity from "./Entity.js";
import Health from "./components/Health.js";
import HealthSystem from "./systems/HealthSystem.js";
import Dimension from "./components/Dimension.js";
import Position from "./components/Position.js";
import MovementSystem from "./systems/MovementSystem.js";
import Gun from "./components/Gun.js";
import RenderSystem from "./systems/RenderSystem.js";

const entities = {}

const entity = new Entity()

entity.addComponent(new Health())

entity.addComponent(new Dimension())

entity.addComponent(new Position({
    x: 200,
    y: 200
}))

entity.addComponent(new Gun())

entities[entity.id] = entity

const healthSystem = new HealthSystem(entities)

const movementSystem = new MovementSystem(entities)

const renderSystem = new RenderSystem(entities)

movementSystem.listen()

update()

function update() {
    movementSystem.movePlayer()

    renderSystem.render()

    requestAnimationFrame(update)
}
