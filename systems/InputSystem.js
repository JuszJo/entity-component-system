class InputSystem {
    constructor(entities, healthSystem) {
        this.entities = entities
        this.healthSystem = healthSystem

        console.log(healthSystem);
    }

    prompt() {
        const readline = require('readline')
        
        readline.emitKeypressEvents(process.stdin)
        
        if(process.stdin.isTTY) {
            process.stdin.setRawMode(true)
        }
        
        process.stdin.on('keypress', (chunk, key) => {
            if(key && key.name == "space") {
                this.healthSystem.reduceHealth()
            }
        })
    }
}

module.exports = InputSystem