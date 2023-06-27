class Bullet {
	constructor(
		ctx,
		playerW,
		playerH,
		playerX,
		playerY,
		playerY0,
		canvasW,
		canvasH
	) {
		this.ctx = ctx

		this.radius = 8

		this.canvasH = canvasH

		this.playerH = playerH
		this.playerY0 = playerY0

		this.floor = this.playerY0 + this.playerH - this.radius

		this.x = playerX + playerW
		this.y = playerY + playerH / 2.5
		this.vy = 0
		this.vx = 10
	}

	draw() {
		this.ctx.beginPath()
		this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
		this.ctx.fillStyle = 'red'
		this.ctx.fill()
		this.ctx.closePath()
	}

	move() {
		this.gravity = 0

		this.vy += this.gravity

		this.x += this.vx
		this.y += this.vy

		if (this.y > this.floor) {
			this.y = this.floor
			this.vy *= 1
		}
	}
}

export default Bullet
