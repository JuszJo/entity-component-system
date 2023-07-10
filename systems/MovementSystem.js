const controls = {
    up: false,
    down: false,
    left: false,
    right: false,
}

const controlsArrow = {
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
            if(key == "ArrowUp") {
                controlsArrow.up = true
            }
            if(key == "ArrowDown") {
                controlsArrow.down = true
            }
            // if(key == "a") {
            //     controls.left = true
            // }
            // if(key == "d") {
            //     controls.right = true
            // }
        })

        addEventListener('keyup', e => {
            const key = e.key
        
            if(key == "w") {
                controls.up = false
            }
            if(key == "s") {
                controls.down = false
            }
            if(key == "ArrowUp") {
                controlsArrow.up = false
            }
            if(key == "ArrowDown") {
                controlsArrow.down = false
            }
            // if(key == "a") {
            //     controls.left = false
            // }
            // if(key == "d") {
            //     controls.right = false
            // }
        })
    }

    static increaseBallSpeed(ballEntity) {
        if(!(ballEntity.components.ball.speedX > ballEntity.components.ball.maxSpeed)) {
            ballEntity.components.ball.speedX += 1
            ballEntity.components.ball.speedY += 1
        }
    }

    movePlayer() {
        for(const id in this.entities) {
            const currentEntity = this.entities[id]

            if(currentEntity.name == "player1") {
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
            if(currentEntity.name == "player2") {
                if(controlsArrow.up) {
                    currentEntity.components.position.value.y -= 5
                }
                if(controlsArrow.down) {
                    currentEntity.components.position.value.y += 5
                }
                if(controlsArrow.left) {
                    currentEntity.components.position.value.x -= 5
                }
                if(controlsArrow.right) {
                    currentEntity.components.position.value.x += 5
                }
            }
        }
    }
}