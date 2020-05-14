class Player {
    
    constructor(pos, matrix, score, position) {
        this._score = score || 0;
        this._matrix = matrix || null;
        this._pos = pos || {x: 0, y:0};
        this._position = position;
    }
    
    get matrix() {
        
        return this._matrix;
    }
    
    set matrix(matrix) {
        
        this._matrix = matrix;
    }

    get pos() {
        
        return this._pos;
    }
    
    set pos(pos) {
        
        this._pos = pos;
    }

    get score() {
        
        return this._score;
    }
    
    set score(score) {
        
        this._score = score;
    }

    get position() {
        
        return this._position;
    }
    
    set position(position) {
        
        this._position = position;
    }
}