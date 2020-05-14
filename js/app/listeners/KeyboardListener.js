class KeyboardListener{
    constructor(document){
        this._document = document;

        document.addEventListener('keydown', this.handleKeydown);

        this._state = {
            observers:[]
        }
    }
    
    
        
    
    subscribe = (observerFunction, game) => {
        let observer = {
            function: observerFunction,
            game: game
        }
        this.state.observers.push(observer)
    }

    notifyAll = (command) => {
        console.log(`Notifying ${this.state.observers.length} observers`)

        for(const observerFunction of this.state.observers)
            observerFunction.function(command, observerFunction.game)
    }
    
    handleKeydown = (event) => {
        const command = event.code;
        let that = this;
        
        // game.movePlayer(command)
        that.notifyAll(command)
        
    }

    

    set document(document){
        this._document = document;
    }

    get document(){
        return this._document;
    }

    set state(state){
        this._state = state;
    }

    get state(){
        return this._state;
    }


}
