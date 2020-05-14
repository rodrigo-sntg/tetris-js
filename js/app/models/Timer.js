class Timer {
    
    
    constructor(dropCounter, dropInterval, lastTime) {
        this._dropCounter = dropCounter;
        this._dropInterval = dropInterval;
        this._lastTime = lastTime;
    }
    

    get lastTime() {
        
        return this._lastTime;
    }
    
    set lastTime(lastTime) {
        
        this._lastTime = lastTime;
    }

    get dropInterval() {
        
        return this._dropInterval;
    }
    
    set dropInterval(dropInterval) {
        
        this._dropInterval = dropInterval;
    }

    get dropCounter() {
        
        return this._dropCounter;
    }
    
    set dropCounter(dropCounter) {
        
        this._dropCounter = dropCounter;
    }

}


