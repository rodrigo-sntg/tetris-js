class Arena {
    
    constructor(matrix) {
        
        this._matrix = matrix || [];
    }
    
    get matrix() {
        
        return this._matrix;
    }
    
    set matrix(matrix) {
        
        this._matrix = matrix;
    }
}