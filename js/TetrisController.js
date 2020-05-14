class Tetris {

    constructor() {
        // this.createGame();
        // const canvasNextPiece = document.getElementById('nextPiece')
    
        // const contextNextPiece = this.canvasNextPiece.getContext('2d')
        // // context.scale(20,20);
        // contextNextPiece.scale(20,20);
        this._pieces = 'ILJOTSZ';
        
        this._nextPiece = this.pieces[this.pieces.length * Math.random() | 0];
        
    
        

        this._timer = new Timer(0,1000,0);

        this._arena = this.createMatrix(12,20);
        this._player = new Player({x: 0, y:0}, null, 0, new Position())

        this.playerReset(this._player, this._arena);
        this.updateScore();
    }

    // createGame(){
        // const canvas = document.getElementById('tetris')
        // const context = canvas.getContext('2d')
    
    arenaSweep() {
        let rowCount = 1;
        outer: for (let y = this._arena.length -1; y > 0 ; --y) {
            for (let x = 0; x < this._arena[y].length; ++x) {
                if(this._arena[y][x] === 0 )
                    continue outer;
            }

            const row = this._arena.splice(y,1)[0].fill(0);
            this._arena.unshift(row);
            ++y;

            this._player.score += rowCount * 10;
            rowCount *= 2;
        }
    }
    
    
    collide(arena, player) {
        const [m,o] = [player.matrix, player.pos];
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if(m[y][x] !== 0
                    && (arena[y + o.y] 
                    && arena[y + o.y][x + o.x]) !== 0)
                    return true
            }
        }
        return false;
    }
    
    createMatrix(w,h) {
        const matrix = [];
        while(h--){ //not zero
            matrix.push(new Array(w).fill(0));
        }

        return matrix;
    }
    
    createPiece(type) {
        if(type === 'T'){
            return [
                [0,0,0],
                [1,1,1],
                [0,1,0],
            ];
        } else if(type === 'O'){
            return [
                [2,2],
                [2,2]
            ];
        } else if(type === 'L'){
            return [
                [0,3,0],
                [0,3,0],
                [0,3,3],
            ];
        } else if(type === 'J'){
            return [
                [0,4,0],
                [0,4,0],
                [4,4,0],
            ];
        } else if(type === 'I'){
            return [
                [0,5,0,0],
                [0,5,0,0],
                [0,5,0,0],
                [0,5,0,0],
            ];
        } else if(type === 'S'){
            return [
                [0,6,6],
                [6,6,0],
                [0,0,0],
            ];
        } else if(type === 'Z'){
            return [
                [7,7,0],
                [0,7,7],
                [0,0,0],
            ];
        }
    }
    
    // drawNextPiece(matrix) {
    //     contextNextPiece.fillStyle = '#000';
    //     contextNextPiece.fillRect(0,0,canvasNextPiece.width, canvasNextPiece.height);

    //     drawMatrixNext(matrix, {x: 3, y: 3});
    // }
    
    // drawMatrixNext(matrix, offset) {
    //     matrix.forEach((row,y) => {
    //         row.forEach((value,x) => {
    //             if(value !== 0){
    //                 contextNextPiece.fillStyle = this._colors[value];
    //                 contextNextPiece.fillRect((x + offset.x/2),
    //                                 (y + offset.y/2), 
    //                                 1,1)
    //             }
    //         })    
    //     })
    // }
    
    
    // drawMatrix(matrix, offset) {
    //     matrix.forEach((row,y) => {
    //         row.forEach((value,x) => {
    //             if(value !== 0){
    //                 context.fillStyle = this._colors[value];
    //                 context.fillRect(x + offset.x,
    //                                 y + offset.y, 
    //                                 1,1)
    //             }
    //         })    
    //     })
    // }
    
    drawMatrix(matrix, offset, context) {
        matrix.forEach((row,y) => {
            row.forEach((value,x) => {
                if(value !== 0){
                    context.fillStyle = this._colors[value];
                    context.fillRect(x + offset.x,
                                    y + offset.y, 
                                    1,1)
                }
            })    
        })
    }
    
    merge(arena, player) {
        player.matrix.forEach((row,y) => {
            row.forEach((value,x) => {
                if(value !== 0){
                    arena[y + player.pos.y][x + player.pos.x] = value
                }
            })    
        })
    }
    
        
        
    
        
    addDropCounter(count) {
        this.timer.dropCounter += count;
    }

    setLastTime(time) {
        this.timer.lastTime = time;
    }
    playerDrop() {
        this._player.pos.y++;
        if(this.collide(this._arena, this._player)){
            this._player.pos.y--;
            this.merge(this._arena, this._player);
            this.playerReset(this._player, this._arena);
            this.arenaSweep();
            this.updateScore();
        }
        
        this.timer.dropCounter = 0;
    }
    
    
    playerMove(dir) {
        this._player.pos.x += dir;
        if(this.collide(this._arena,this._player))
            this._player.pos.x -= dir;
    }
    
        
    
    playerReset(player, arena) {
        if(!this.nextPiece)
            this.nextPiece = this.pieces[this.pieces.length * Math.random() | 0];
        
        player.matrix = this.createPiece(this.nextPiece);
        this.nextPiece = this.pieces[this.pieces.length * Math.random() | 0];

        player.pos.y = 0;
        player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0); // using bitwise comparator to floor number

        if(this.collide(arena, player)){
            arena.forEach(row => row.fill(0));
            player.score = 0;
            this.updateScore();
        }
    }
    
    playerRotate(dir) {
        const pos = this._player.pos.x;
        let offset = 1;
        this.rotate(this._player.matrix, dir);

        while(this.collide(this._arena,this._player)){
            this._player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if(offset > this._player.matrix[0].length){
                this.rotate(this._player.matrix, -dir);
                this._player.pos.x = pos;
                return;
            }
        }
    }
    
    rotate(matrix, dir) {
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [
                    matrix[x][y],
                    matrix[y][x]
                ] = [
                    matrix[y][x],
                    matrix[x][y]
                ]
            }
        }

        if(dir > 0)
            matrix.forEach(row => row.reverse());
        else
            matrix.reverse();
    }
    
    updateScore() {
        document.getElementById('score').innerText = this._player.score;
    }
    
    
        
        
        
        
    
    
    movePlayer(command) {
        const acceptedMoves = {
            ArrowLeft(game){
                game.playerMove( -1)
            },
            ArrowRight(game){
                game.playerMove(1)
            },
            ArrowDown(game){
                game.playerDrop();
            },
            KeyQ(game){
                game.playerRotate(-1);
            },
            KeyW(game){
                game.playerRotate(1);
            },
        }

        const moveFunction = acceptedMoves[command]
        if(moveFunction)
            moveFunction.function(moveFunction.game)
        return

    }

    movePlayer(command, game) {
        const acceptedMoves = {
            ArrowLeft(){
                game.playerMove( -1)
            },
            ArrowRight(){
                game.playerMove(1)
            },
            ArrowDown(){
                game.playerDrop();
            },
            KeyQ(){
                game.playerRotate(-1);
            },
            KeyW(){
                game.playerRotate(1);
            },
        }

        const moveFunction = acceptedMoves[command]
        if(moveFunction)
            moveFunction()
        return

    }
    


    get pieces() {
        
        return this._pieces;
    }
    
    set pieces(pieces) {
        
        this._pieces = pieces;
    }    

    get nextPiece() {
        
        return this._nextPiece;
    }
    
    set nextPiece(nextPiece) {
        
        this._nextPiece = nextPiece;
    }    

    get arena() {
        
        return this._arena;
    }
    
    set arena(arena) {
        
        this._arena = arena;
    }    

    get player() {
        
        return this._player;
    }
    
    set player(player) {
        
        this._player = player;
    }

    get timer() {
        
        return this._timer;
    }
    
    set timer(timer) {
        
        this._timer = timer;
    }

    get nextPiece(){
        return this._nextPiece;
    }
}
