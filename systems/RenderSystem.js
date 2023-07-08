export default class RenderSystem {
    constructor(entities) {
        this.entities = entities

        this.canvas = document.querySelector('canvas')

        this.canvasWidth = 800
        this.canvasHeigth = 600

        this.canvas.width = this.canvasWidth
        this.canvas.height = this.canvasHeigth

        this.drawingSurface = this.canvas.getContext('2d')
    }

    render() {
        this.drawingSurface.clearRect(0, 0, this.canvasWidth, this.canvasHeigth)

        for(const id in this.entities) {
            const currentEntity = this.entities[id]

            this.drawingSurface.fillRect(
                currentEntity.components.position.value.x,
                currentEntity.components.position.value.y,
                currentEntity.components.dimension.value.width,
                currentEntity.components.dimension.value.height,
            )
        }
    }
}