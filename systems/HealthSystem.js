export default class HealthSystem {
    constructor(entities) {
        this.entities = entities
    }
    
    reduceHealthCLI() {
        for(const id in this.entities) {
            const currentEntity = this.entities[id]

            if(currentEntity.components.health) {
                currentEntity.components.health.value -= 1
                
                console.log(currentEntity)

                if(currentEntity.components.health.value == 0) {
                    console.log("Game Over");

                    process.exit()
                }
            }
        }
    }

    listenCLI() {
        const readline = require('readline')
        
        readline.emitKeypressEvents(process.stdin)
        
        if(process.stdin.isTTY) {
            process.stdin.setRawMode(true)
        }
        
        process.stdin.on('keypress', (chunk, key) => {
            if(key && key.name == "space") {
                this.reduceHealth()
            }
        })
    }
}