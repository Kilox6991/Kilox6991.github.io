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
	hit: false,
	hit1: false,

	init: function () {
		const divCanvas = document.createElement('div')
		const divHeal = document.createElement('div')
		divHeal.id = 'divHeal'
		const divHealPlayer = document.createElement('div')
		divHealPlayer.id = 'divHealPlayer'
		const divLifePlayer = document.createElement('div')
		divLifePlayer.id = 'divLifePlayer'
		const divTemporizador = document.createElement ('div')
		divTemporizador.id = 'divTemporizador'
		const divHealPlayer1 = document.createElement('div')
		divHealPlayer1.id = 'divHealPlayer1'
		const divLifePlayer1 = document.createElement('div')
		divLifePlayer1.id = 'divLifePlayer1'
		const canvas = document.createElement('canvas')

		this.ctx = canvas.getContext('2d')

		canvas.width = this.canvasW
		canvas.height = this.canvasH

		ScoreBoard.init(this.ctx)

		document.body.appendChild(divCanvas)
		divCanvas.appendChild(divHeal)

		divHeal.appendChild(divHealPlayer)
		divHealPlayer.appendChild(divLifePlayer)

		divHeal.appendChild(divTemporizador)

		divHeal.appendChild(divHealPlayer1)
		divHealPlayer1.appendChild(divLifePlayer1)

		divCanvas.appendChild(canvas)

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

		
		const lifePlayer1ElDOM = document.querySelector('#divHealPlayer1 #divLifePlayer1')
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
			this.isCollision()

			this.drawAll()
			this.moveAll()
			this.collisionPlayer()
			
			
			


			// this.gameOver()

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

	},
	stop: function () {
		this.reset()
		clearInterval(this.intervalId)
	},
	isCollision() {

		for (let i = 0; i < this.player1.bullets.length; i++) {
			if (this.player.x + this.player.width-100 >= this.player1.bullets[i].x &&
				this.player1.bullets[i].x >= this.player.x-100  &&
				this.player.y +60 <= this.player1.bullets[i].y &&
				this.player.y +250>= this.player1.bullets[i].y) {
				this.hit = true
				this.player.life = this.player.life-10
				this.player1.bullets.splice(0,1)

				let lifePlayerElDOM = document.querySelector('#divLifePlayer');
				lifePlayerElDOM.style.width = `${this.player.life}%`;
			}
		}
		for (let i = 0; i < this.player.bullets.length; i++) {
			if (this.player1.x + this.player1.width+50 >= this.player.bullets[i].x &&
				this.player.bullets[i].x >= this.player1.x+60  &&
				this.player1.y +65 <= this.player.bullets[i].y &&
				this.player1.y +230>= this.player.bullets[i].y) {
				console.log("me ha dao");
				this.hit1 = true
				this.player1.life1 = this.player1.life1-10
				this.player.bullets.splice(0,1)
				console.log(this.player1.life1)

				let lifePlayer1ElDOM = document.querySelector('#divLifePlayer1');
				lifePlayer1ElDOM.style.width = `${this.player1.life1}%`;

				if(this.player1.life1 === 0){
					console.log("GAMEOVER")
					
					
				}
			}
		}
	},
	collisionPlayer() {
		if (this.player.x - 90 + this.player.width >= this.player1.x + 70) {
			this.player.flipPlayer(true)
			this.player1.flipPlayer(true)
		} else {
			this.player.flipPlayer(false)
			this.player1.flipPlayer(false)
		}
	},
	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvasW, this.canvasH)
	},
	// gameOver(){
	// 	// clearInterval(this.intervalId)
	// 	if(this.player.life === 0){
	// 		this.start()
	// 	}else if(this.player1.life1 === 0){
	// 		this.start()
	// 	}
	// }
}

export default Game