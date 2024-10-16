

class Piece {
    constructor(type, color) {
        this.type = type; // 'rook', 'knight', 'bishop', 'queen', 'king', 'pawn'
        this.color = color; // 'white' or 'black'
        this.hasMoved = false; // Pour le rock  et le pion
    }
    move() {
        this.hasMoved = true;
    }
}

export default Piece;