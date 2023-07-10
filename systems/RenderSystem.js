export default class RenderSystem {
    constructor(entities) {
        this.entities = entities

        this.canvas = document.querySelector('canvas')

        this.canvasWidth = 800
        this.canvasHeight = 600


        this.canvas.width = this.canvasWidth
        this.canvas.height = this.canvasHeight

        this.drawingSurface = this.canvas.getContext('2d')
    }

    render() {
        this.drawingSurface.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

        for(const id in this.entities) {
            const currentEntity = this.entities[id]

            // console.log(currentEntity);
            if(currentEntity.components.position && !currentEntity.components.ball) {
                this.drawingSurface.fillRect(
                    currentEntity.components.position.value.x,
                    currentEntity.components.position.value.y,
                    currentEntity.components.dimension.value.width,
                    currentEntity.components.dimension.value.height,
                )
            }
            else if(currentEntity.components.ball) {
                const ball = currentEntity.components

                this.drawingSurface.beginPath();
                this.drawingSurface.arc(
                    ball.position.value.x, ball.position.value.y,
                    ball.dimension.value.width,
                    0, Math.PI * 2,
                    false
                );
                this.drawingSurface.fill()
                this.drawingSurface.closePath();
            }
        }
    }
}