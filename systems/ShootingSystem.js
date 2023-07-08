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
                        console.log("Shoot");
                    }
                })
            }
        }
    }

    shoot() {
        
    }
}