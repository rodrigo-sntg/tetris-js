export default function createKeyboardListener(document) {

    const state = {
        observers:[]
    }

    function subscribe(observerFunction, game){
        let observer = {
            function: observerFunction,
            game: game
        }
        state.observers.push(observer)
    }

    function notifyAll(command){
        console.log(`Notifying ${state.observers.length} observers`)

        for(const observerFunction of state.observers)
            observerFunction.function(command, observerFunction.game)
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