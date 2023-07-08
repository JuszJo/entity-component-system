export default class Entity {
    constructor(value) {
        this.id = (+new Date()).toString(16) + (Math.random() * 1000000 | 0).toString(16)
        this.components = {}

        if(value == "ball") {
            
        }
    }

    addComponent(component) {
        this.components[component.name] = component
    }

    removeComponent(componentName) {
        let name = componentName

        if(typeof componentName == "function") {
            name = componentName.name || componentName.prototype.name
        }

        delete this.components[name]
    }

    printInfo() {
        console.log(JSON.stringify(this, null, 4));
    }
}