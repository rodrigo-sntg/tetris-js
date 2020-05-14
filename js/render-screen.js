export default function renderScreen(screen, game, requestAnimationFrame, time) {
    const context = screen.getContext('2d')
    context.fillStyle = 'white'
    context.clearRect(0, 0, 10, 10)

    const deltaTime = time - game.timer.lastTime;
    game.setLastTime(time)
    game.addDropCounter(deltaTime)
    if(game.timer.dropCounter > game.timer.dropInterval)
        game.playerDrop();

    draw();

    
    requestAnimationFrame((time) => {
        renderScreen(screen, game, requestAnimationFrame, time)
    })

    function draw(){
        context.fillStyle = '#000';
        context.fillRect(0,0,screen.width, screen.height);

        game.drawMatrix(game.arena, {x:0, y:0}, context);
        game.drawMatrix(game.player.matrix, game.player.pos, context);
    }
    
}