class ViewRender{
    constructor(screen, nextPiece, game) {
        this._canvasNextPiece = nextPiece;

        this._colors = [
            null,
            'red',
            'blue',
            'violet',
            'green',
            'purple',
            'orange',
            'pink',
        ]
        
    
        this._contextNextPiece = nextPiece.getContext('2d')
        // context.scale(20,20);
        this._contextNextPiece.scale(1,1);

        this._context = screen.getContext('2d')
        this._context.fillStyle = 'white'
        this._context.clearRect(0, 0, 10, 10)
        this._game = game;
        this._screen = screen;
        
    }

    renderScreen(requestAnimationFrame, time) {
        
        const deltaTime = time - this._game.timer.lastTime;

        this._game.setLastTime(time)
        this._game.addDropCounter(deltaTime)
        
        if(this._game.timer.dropCounter > this._game.timer.dropInterval)
        this._game.playerDrop();
    
        this.draw();
        this.drawNextPiece(this._game.createPiece(this._game.nextPiece));
        
        requestAnimationFrame((time) => {
            this.renderScreen(requestAnimationFrame, time)
        })
        
    }

    draw(){
        this._context.fillStyle = '#000';
        this._context.fillRect(0,0,this._screen.width, this._screen.height);

        this.drawMatrix(this._game.arena, {x:0, y:0});
        this.drawMatrix(this._game.player.matrix, this._game.player.pos);
    }


    drawNextPiece(matrix) {
        this._contextNextPiece.fillStyle = '#000';
        this._contextNextPiece.fillRect(0,0,this._canvasNextPiece.width, this._canvasNextPiece.height);

        this.drawMatrixNext(matrix, {x: 3, y: 3});
    }
    
    drawMatrixNext(matrix, offset) {
        matrix.forEach((row,y) => {
            row.forEach((value,x) => {
                if(value !== 0){
                    this._contextNextPiece.fillStyle = this.colors[value];
                    this._contextNextPiece.fillRect((x + offset.x/2),
                                    (y + offset.y/2), 
                                    1,1)
                }
            })    
        })
    }
    
    
    drawMatrix(matrix, offset) {
        matrix.forEach((row,y) => {
            row.forEach((value,x) => {
                if(value !== 0){
                    this._context.fillStyle = this.colors[value];
                    this._context.fillRect(x + offset.x,
                                    y + offset.y, 
                                    1,1)
                }
            })    
        })
    }

    get colors(){
        return this._colors;
    }

}

