import Background from './Background.js'
import Player from './Player.js'
import ScoreBoard from './ScoreBoard.js'
import Player1 from './Player1.js'
import Floor from './Floor.js'



const Game = {
	fps: 60,
	ctx: undefined,
	canvasW: innerWidth,
	canvasH: innerHeight,
	scoreBoard: undefined,
	worldVelocity: 0,
	players: [], //Array para guardar a los jugadores y posicionarlos
	keys: {
		RIGHT: 'KeyD',
		JUMP: 'KeyW',
		LEFT: 'KeyA',
		SHOOT: 'KeyS',
	},
	keys1: {
		RIGHT1: 'ArrowRight',
		LEFT1: 'ArrowLeft',
		JUMP1: 'ArrowUp',
		SHOOT1: 'ArrowDown',
	},

	init: function () {
		const canvas = document.createElement('canvas')

		this.ctx = canvas.getContext('2d')

		canvas.width = this.canvasW
		canvas.height = this.canvasH

		ScoreBoard.init(this.ctx)

		document.body.append(canvas)

		this.start()
	},

	// Inicializa todos los objetos y variables que usa el juego
	reset: function () {
		this.player = new Player(this.ctx, this.canvasW, this.canvasH, this.keys)
		this.player1 = new Player1(this.ctx, this.canvasW, this.canvasH, this.keys1)
		
		this.background = new Background(this.ctx, this.canvasW, this.canvasH)
		this.Floor = new Floor(this.ctx, this.canvasW, this.canvasH)

		this.scoreBoard = ScoreBoard

		this.score = 0

		this.frameCounter = 0

		this.bso = new Audio()
		this.bso.volume = 1

		this.bso.play()

		this.gameoverAudio = new Audio('../assets/sounds/gameover.mp3')
		this.gameoverAudio.volume = 1
	},

	// Arranca el loop de animación
	start: function () {
		this.reset()

		this.intervalId = setInterval(() => {
			// 60(this.fps) veces por segundo borro y pinto el canvas
			this.clearCanvas()

			this.frameCounter++
			this.score += 0.01
			this.worldVelocity -= 0
			this.bso.playbackRate += 0.0001

			this.drawAll()
			this.moveAll()


			if (this.isCollision()) this.gameover()

		}, 1000 / this.fps)
	},

	drawAll() {
		this.background.draw()
		this.player.draw(this.frameCounter)
		this.player1.draw(this.frameCounter)
		this.Floor.draw()
		this.scoreBoard.update(this.score)
	},

	moveAll() {
		this.background.move(this.worldVelocity)
		this.player.move()
		this.player1.move()
		this.obstacles.forEach((obstacle) => obstacle.move(this.worldVelocity))
	},
	stop: function () {
		this.reset()
		clearInterval(this.intervalId)
	},

	
	gameover() {
		clearInterval(this.intervalId)

		this.bso.pause()

		this.gameoverAudio.play()

		if (confirm('Quieres jugar de nuevo')) {
			this.start()
		}
	},

	isCollision() {
		return this.obstacles.some(
			(obstacle) =>
				obstacle.x < this.player.x + this.player.width - 20 &&
				obstacle.x + obstacle.width > this.player.x &&
				obstacle.y + obstacle.height > this.player.y &&
				obstacle.y < this.player.y + this.player.height - 20
		)
	},

	clearObstacles() {
		this.obstacles = this.obstacles.filter(
			(obstacle) => obstacle.x + obstacle.width > 0
		)
	},

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvasW, this.canvasH)
	},
	adjustPlayersPosition() {
		// Ajustar posición de los jugadores para que se miren el uno al otro
		this.player2.x = this.player.x + this.player.width + 50;
		this.player.y = this.player2.y = Math.min(this.player.y, this.player2.y);
	},
}

export default Game
