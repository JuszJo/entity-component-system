const Entity = require("./Entity");
const Health = require("./components/Health");
const HealthSystem = require("./systems/HealthSystem");

const entities = {}

const entity = new Entity()

entity.addComponent(new Health())

entities[entity.id] = entity

const healthSystem = new HealthSystem(entities)

healthSystem.listen()