const ScoreBoard = {
	ctx: undefined,
	init: function (ctx) {
		ctx.font = '30px sans-serif'
		this.ctx = ctx
	},

	update: function (score) {
		this.ctx.fillStyle = 'green '
		// Primer argumento el texto segundo y tercero la posición x, y en el canvas
		this.ctx.fillText(Math.floor(score), 50, 50)
	},
}

export default ScoreBoard
