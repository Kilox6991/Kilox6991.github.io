import Bullet from "./Bullet.js"

class Player1{
    constructor(ctx, canvasW, canvasH, keys1){
        this.ctx = ctx
        this.keys1 = keys1

        this.canvasW = canvasW
        this.canvasH = canvasH

        this.x = canvasW * 0.8
        
        this.y0 = canvasH * 0.7
        this.y = this.y0
        
        this.vy = 0
        this.vx = 0

        this.img = new Image()
        this.img.src = 'assets/characters/Infantryman/Idle.png'

        this.img.frameCount = 6
        this.frameIndex = 0

        this.width = 146
        this.height = 150 

        this.bullets = []

        this.jumpAudio = new Audio('../assets/sounds/jump.wav')
		this.jumpAudio.volume = 1

		this.bulletAudio = new Audio('../assets/sounds/bullet.wav')
		this.bulletAudio.volume = 1

        this.pressedControl = {
            RIGHT1 : false,
            JUMP1 : false, 
            LEFT1 : false,
        }

        this.setControls()
    }
    setControls(){
        addEventListener('keydown', (event) => {
			switch (event.code) {
				case this.keys1.JUMP1:
					this.pressedControl.JUMP1 = true
					break
				case this.keys1.RIGHT1:
					this.pressedControl.RIGHT1 = true
					break
				case this.keys1.SHOOT1:
					this.shoot()
					this.bulletAudio.play()
					break
				case this.keys1.LEFT1:
					this.pressedControl.LEFT1 = true
					break
			}
		})
		addEventListener('keyup', (event) => {
			switch (event.code) {
				case this.keys1.RIGHT1:
					this.pressedControl.RIGHT1 = false
					break
				case this.keys1.JUMP1: 
					this.pressedControl.JUMP1 = false
					break
				case this.keys1.LEFT1:
					this.pressedControl.LEFT1 = false
					break
			}
		})
    }
    move() {
		//Movimiento player (WASD)
		if (this.pressedControl.RIGHT1){
			this.vx = 10
		}else if (this.pressedControl.LEFT1){
			this.vx = -10
		}else{
			this.vx = 0
		}
		if (this.pressedControl.JUMP1){
			this.vy = -10
		}else{
			this.vy = 0
		}
		

		this.gravity = 3.5
		this.vy += this.gravity
		this.y += this.vy
		this.x += this.vx
		if (this.y >= this.y0) {
			this.vy = 0
			this.y = this.y0
		}
	}
    draw(frameCounter) {
		// Pintamos un cada frame del sprite en función del frameIndex
		this.ctx.drawImage(
			this.img,

			(this.img.width / this.img.frameCount) * this.frameIndex,
			0,
			this.img.width / this.img.frameCount,
			this.img.height,

			this.x,
			this.y,
			this.width,
			this.height
		)

		this.bullets.forEach((bullet) => {
			bullet.draw()
			bullet.move()
		})

		this.bullets = this.bullets.filter(
			(bullet) => bullet.x - bullet.radius < this.canvasW
		)
		this.animateSprite(frameCounter)
	}

	// Cambiamos cada 6 frames del juego el frameIndex del sprite para que dibuje el personaje con otra pose
	animateSprite(frameCounter) {
		if (frameCounter % 6 === 0) {
			this.frameIndex++
		}

		if (this.frameIndex >= this.img.frameCount) this.frameIndex = 0
	}

	shoot() {
		this.bullets.push(
			new Bullet(
				this.ctx,
				this.width,
				this.height,
				this.x,
				this.y,
				this.y0,
				this.canvasW,
				this.canvasH
			)
		)
	}
}
export default Player1
