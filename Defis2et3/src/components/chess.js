// src/Chess.js
class Chess {
    constructor(pieces) {
        this.pieces = pieces;
        this.turn = 'white';
    }

    move(start, end) {
        const piece = this.pieces[start];
        if (!piece) {
            alert("error: Il n'y a pas de pièce à cet emplacement");
            return;
        }
        if (piece.color !== this.turn) {
            alert("error: Ce n'est pas votre tour");
            return;
        }

        // Gestion des différents types de pièces
        switch (piece.type) {
            case 'pawn':
                this.movePawn(piece, start, end);
                break;
            case 'rook':
                this.moveRook(piece, start, end);
                break;
            case 'king':
                this.moveKing(piece, start, end);
                break;
            case 'bishop':
                this.moveBishop(piece, start, end);
                break;
            case 'queen':
                this.moveQueen(piece, start, end);
                break;
            case 'knight':
                this.moveKnight(piece, start, end);
                break;
            default:
                alert("error: Type de pièce non supporté");
                return;
        }
    }

    movePawn(piece, start, end) {
        const direction = piece.color === 'white' ? -1 : 1;
        const initialRow = piece.color === 'white' ? 7 : 2;
        const startRow = parseInt(start[1]);
        const endRow = parseInt(end[1]);

        // Mouvement initial (deux cases vers l'avant)
        if (!piece.hasMoved && endRow === startRow + 2 * direction && startRow === initialRow) {
            const middleSquare = start[0] + (startRow + direction); // Case intermédiaire
            if (!this.pieces[middleSquare] && !this.pieces[end]) {
                this.updatePiecePosition(piece, start, end);
                return;
            } else {
                alert("error: Il y a une pièce sur le chemin ou à la destination");
                return;
            }
        }

        // Mouvement normal (une case vers l'avant)
        if (endRow === startRow + direction) {
            // Capture en diagonale
            if (start[0] !== end[0]) {
                if (this.pieces[end] && this.pieces[end].color !== piece.color) {
                    this.updatePiecePosition(piece, start, end);
                    this.promotion(end);
                    return;
                } else {
                    alert("error: Vous ne pouvez pas capturer une pièce de la même couleur ou il n'y a pas de pièce à capturer");
                    return;
                }
            }

            // Mouvement simple vers une case vide
            if (!this.pieces[end]) {
                this.updatePiecePosition(piece, start, end);
                this.promotion(end);
                return;
            } else {
                alert("error: La case de destination n'est pas vide");
                return;
            }
        } else {
            alert("error: Le pion ne peut pas se déplacer de cette façon");
            return;
        }
    }

    moveRook(piece, start, end) {
        const startRow = parseInt(start[1]);
        const endRow = parseInt(end[1]);

        // Vérifie si le mouvement est en ligne droite
        if (start[0] !== end[0] && start[1] !== end[1]) {
            alert("error: La tour ne peut se déplacer que horizontalement ou verticalement");
            return;
        }

        const direction = start[0] === end[0] ? (endRow > startRow ? 1 : -1) : (end[0] > start[0] ? 1 : -1);

        // Mouvement vertical
        if (start[0] === end[0]) {
            let i = startRow + direction;
            while (i !== endRow) {
                if (this.pieces[start[0] + i]) {
                    alert("error: Il y a une pièce sur le chemin");
                    return;
                }
                i += direction;
            }
        }
        // Mouvement horizontal
        else {
            let i = start[0].charCodeAt(0) + direction;
            while (i !== end[0].charCodeAt(0)) {
                if (this.pieces[String.fromCharCode(i) + start[1]]) {
                    alert("error: Il y a une pièce sur le chemin");
                    return;
                }
                i += direction;
            }
        }

        // Vérifie la pièce à la destination
        if (this.pieces[end] && this.pieces[end].color === piece.color) {
            alert("error: Vous ne pouvez pas capturer votre propre pièce");
            return;
        }

        this.updatePiecePosition(piece, start, end);
    }

    moveKing(piece, start, end) {
        const startRow = parseInt(start[1]);
        const endRow = parseInt(end[1]);

        if (Math.abs(startRow - endRow) > 1 || Math.abs(start[0].charCodeAt(0) - end[0].charCodeAt(0)) > 1) {
            alert("error: Le roi ne peut bouger que d'une case dans n'importe quelle direction");
            return;
        }

        if (this.pieces[end] && this.pieces[end].color === piece.color) {
            alert("error: Vous ne pouvez pas capturer votre propre pièce");
            return;
        }

        this.updatePiecePosition(piece, start, end);
    }

    promotion(position) {
        const piece = this.pieces[position];
        if (piece.type === 'pawn') {
            const lastRow = piece.color === 'white' ? '1' : '8';
            if (position[1] === lastRow) {
                piece.type = 'queen'; // Promotion en reine
            }
        }
    }

    updatePiecePosition(piece, start, end) {
        piece.move();
        piece.hasMoved = true;
        this.pieces[end] = piece;
        delete this.pieces[start];
        this.turn = this.turn === 'white' ? 'black' : 'white';
    }

    moveBishop(piece, start, end) {
        const startRow = parseInt(start[1]); // Ligne de départ
        const endRow = parseInt(end[1]); // Ligne d'arrivée
        const startCol = start[0].charCodeAt(0);// Colonne de départ
        const endCol = end[0].charCodeAt(0);// Colonne d'arrivée

        // pas en diagonale
        if (startRow===endRow || startCol===endCol) {
            alert("error: Le fou ne peut se déplacer que en diagonale");
            return;
        }

        const rowDirection = endRow > startRow ? 1 : -1;
        const colDirection = endCol > startCol ? 1 : -1;

        let i = startRow + rowDirection;
        let j = startCol + colDirection;
        while (i !== endRow) {
            if (this.pieces[String.fromCharCode(j) + i]) {
                alert("error: Il y a une pièce sur le chemin");
                return;
            }
            i += rowDirection;
            j += colDirection;
        }

        // Vérifie la pièce à la destination
        if (this.pieces[end] && this.pieces[end].color === piece.color) {
            alert("error: Vous ne pouvez pas capturer votre propre pièce");
            return;
        }

        this.updatePiecePosition(piece, start, end);
    }

    moveQueen(piece, start, end) {
        // meme mv que le fou ou la tour
        this.moveBishop(piece, start, end);
        this.moveRook(piece, start, end);

    }

    moveKnight(piece, start, end) {
        const startRow = parseInt(start[1]);
        const endRow = parseInt(end[1]);
        const startCol = start[0].charCodeAt(0);
        const endCol = end[0].charCodeAt(0);
        if (this.pieces[end] && this.pieces[end].color === piece.color) {
            alert("error: Vous ne pouvez pas capturer votre propre pièce");
            return;
        }
        if (Math.abs(startRow - endRow) === 2 && Math.abs(startCol - endCol) === 1 ) {  // 2 cases en ligne droite et 1 case en diagonale
            this.updatePiecePosition(piece, start, end);
        } else if (Math.abs(startRow - endRow) === 1 && Math.abs(startCol - endCol) === 2 ) { // 1 case en ligne droite et 2 cases en diagonale
            this.updatePiecePosition(piece, start, end);
        } else {
            alert("error: Le cavalier ne peut se déplacer que de deux cases dans une direction et une   case dans une direction perpendiculaire");

        }
    }

}

export default Chess;
