class Position {
    
    constructor(x, y) {
        this._x = x || 0;
        this._y = y || 0;
    }
    
    get x() {
        
        return this._x;
    }
    
    set x(x) {
        
        this._x = x;
    }

    get y() {
        
        return this._y;
    }
    
    set y(y) {
        
        this._y = y;
    }

}