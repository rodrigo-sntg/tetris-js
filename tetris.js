export default function createGame(){
    const canvas = document.getElementById('tetris')
    const context = canvas.getContext('2d')

    const canvasNextPiece = document.getElementById('nextPiece')
    const contextNextPiece = canvasNextPiece.getContext('2d')
    context.scale(20,20);
    contextNextPiece.scale(20,20);
    const pieces = 'ILJOTSZ';
    let nextPiece = pieces[pieces.length * Math.random() | 0];
    

    const colors = [
        null,
        'red',
        'blue',
        'violet',
        'green',
        'purple',
        'orange',
        'pink',
    ]

    function arenaSweep(){
        let rowCount = 1;
        outer: for (let y = arena.length -1; y > 0 ; --y) {
            for (let x = 0; x < arena[y].length; ++x) {
                if(arena[y][x] === 0 )
                    continue outer;
            }

            const row = arena.splice(y,1)[0].fill(0);
            arena.unshift(row);
            ++y;

            player.score += rowCount * 10;
            rowCount *= 2;
        }
    }


    function collide(arena, player){
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

    function createMatrix(w,h){
        const matrix = [];
        while(h--){ //not zero
            matrix.push(new Array(w).fill(0));
        }

        return matrix;
    }

    function createPiece(type){
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

    function draw(){
        context.fillStyle = '#000';
        context.fillRect(0,0,canvas.width, canvas.height);

        drawMatrix(arena, {x:0, y:0}, context);
        drawMatrix(player.matrix, player.pos, context);
    }

    function drawNextPiece(matrix){
        contextNextPiece.fillStyle = '#000';
        contextNextPiece.fillRect(0,0,canvasNextPiece.width, canvasNextPiece.height);

        drawMatrixNext(matrix, {x: 3, y: 3});
    }

    function drawMatrixNext(matrix, offset) {
        matrix.forEach((row,y) => {
            row.forEach((value,x) => {
                if(value !== 0){
                    contextNextPiece.fillStyle = colors[value];
                    contextNextPiece.fillRect((x + offset.x/2),
                                    (y + offset.y/2), 
                                    1,1)
                }
            })    
        })
    }


    function drawMatrix(matrix, offset) {
        matrix.forEach((row,y) => {
            row.forEach((value,x) => {
                if(value !== 0){
                    context.fillStyle = colors[value];
                    context.fillRect(x + offset.x,
                                    y + offset.y, 
                                    1,1)
                }
            })    
        })
    }

    function merge(arena, player){
        player.matrix.forEach((row,y) => {
            row.forEach((value,x) => {
                if(value !== 0){
                    arena[y + player.pos.y][x + player.pos.x] = value
                }
            })    
        })
    }


    let dropCounter = 0;
    let dropInterval = 1000;

    let lastTime = 0;

    function playerDrop(){
        player.pos.y++;
        if(collide(arena, player)){
            player.pos.y--;
            merge(arena, player);
            playerReset();
            arenaSweep();
            updateScore();
        }
        dropCounter = 0;
    }


    function playerMove(dir){
        player.pos.x += dir;
        if(collide(arena,player))
            player.pos.x -= dir;
    }

    

    function playerReset(){
        // player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]); // using bitwise comparator to floor number
        if(!nextPiece)
            nextPiece = pieces[pieces.length * Math.random() | 0];
        
        player.matrix = createPiece(nextPiece);
        nextPiece = pieces[pieces.length * Math.random() | 0];
        drawNextPiece(createPiece(nextPiece))

        player.pos.y = 0;
        player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0); // using bitwise comparator to floor number

        if(collide(arena, player)){
            arena.forEach(row => row.fill(0));
            player.score = 0;
            updateScore();
        }
    }

    function playerRotate(dir){
        const pos = player.pos.x;
        let offset = 1;
        rotate(player.matrix, dir);

        while(collide(arena,player)){
            player.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if(offset > player.matrix[0].length){
                rotate(player.matrix, -dir);
                player.pos.x = pos;
                return;
            }
        }
    }

    function rotate(matrix, dir){
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

    function update(time = 0) {
        const deltaTime = time - lastTime;
        lastTime = time;
        dropCounter += deltaTime;
        if(dropCounter > dropInterval)
            playerDrop();

        draw();
        requestAnimationFrame(update);
    }


    function updateScore(){
        document.getElementById('score').innerText = player.score;
    }


    const arena = createMatrix(12,20);

    // const game = createGame();
    // const keyboardListener = createKeyboardListener();
    // keyboardListener.subscribe(game.movePlayer)

// User actions on key press mapping




    
    const player = {
        pos: {x: 0, y:0},
        matrix: null,
        score: 0
    }
    playerReset();
    updateScore();
    update();


    function movePlayer(command){
        const acceptedMoves = {
            ArrowLeft(){
                playerMove( -1)
            },
            ArrowRight(){
                playerMove(1)
            },
            ArrowDown(){
                playerDrop();
            },
            KeyQ(){
                playerRotate(-1);
            },
            KeyW(){
                playerRotate(1);
            },
        }

        const moveFunction = acceptedMoves[command]
        if(moveFunction)
            moveFunction()
        return

    }

    


    function createKeyboardListener(){
        const state = {
            observers:[]
        }

        function subscribe(observerFunction){
            state.observers.push(observerFunction)
        }

        function notifyAll(command){
            console.log(`Notifying ${state.observers.length} observers`)

            for(const observerFunction of state.observers)
                observerFunction(command)
        }

        document.addEventListener('keydown', handleKeydown)

        function handleKeydown(event){
            const command = event.code;
            
            // game.movePlayer(command)
            notifyAll(command)
            
        }

        return {
            subscribe
        }
    }


    return {
        movePlayer,
        player
    }
}