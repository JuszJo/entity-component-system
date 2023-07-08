const controls = {
    up: false,
    down: false,
    left: false,
    right: false,
}

export default class MovementSystem {
    constructor(entities) {
        this.entities = entities
    }

    listen() {
        addEventListener('keydown', e => {
            const key = e.key
        
            if(key == "w") {
                controls.up = true
            }
            if(key == "s") {
                controls.down = true
            }
            if(key == "a") {
                controls.left = true
            }
            if(key == "d") {
                controls.right = true
            }
        })

        addEventListener('keyup', e => {
            const key = e.key
        
            if(key == "w") {
                controls.up = false
            }
            if(key == "s") {
                controls.down = false
            }
            if(key == "a") {
                controls.left = false
            }
            if(key == "d") {
                controls.right = false
            }
        })
    }

    movePlayer() {
        for(const id in this.entities) {
            const currentEntity = this.entities[id]

            if(currentEntity.components.position) {
                if(controls.up) {
                    currentEntity.components.position.value.y -= 5
                }
                if(controls.down) {
                    currentEntity.components.position.value.y += 5
                }
                if(controls.left) {
                    currentEntity.components.position.value.x -= 5
                }
                if(controls.right) {
                    currentEntity.components.position.value.x += 5
                }
            }
        }
    }
}