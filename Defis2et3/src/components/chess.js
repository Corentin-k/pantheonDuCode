// src/Chess.js
class Chess {
    constructor(pieces) {
        this.pieces = pieces;
        this.turn = 'white';
    }

    move(start, end) {
        const piece = this.pieces[start];
        if (!piece) {
            return;
        }
        if (piece.color !== this.turn) {
            return;
        }
        if(start===end){
            return;
        }

        // Essayer de simuler le mouvement
        const originalPosition = { ...piece }; // Sauvegarder l'état original de la pièce
        const originalEndPiece = this.pieces[end]; // Sauvegarder la pièce à la destination (s'il y en a une)

        // Gestion des différents types de pièces
        switch (piece.type) {
            case 'pawn':
                this.movePawn(piece, start, end);
                break;
            case 'rook':

                this.moveRook(piece, start, end);
                break;
            case 'king':
                this.roque(piece, start, end);
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

                return;
        }
        this.turn = this.turn === 'white' ? 'black' : 'white';
        if (this.checkEchec(piece.color)) {
            // Si le roi est en échec, annuler le mouvement

            this.turn = this.turn === 'white' ? 'black' : 'white';
            this.pieces[start] = originalPosition;
            if (originalEndPiece) {
                this.pieces[end] = originalEndPiece;
            } else {
                delete this.pieces[end];
            }
        }

        if (!this.checkEchec(piece.color)) {
            this.pieces[this.findKingPosition(piece.color)].isInCheck = false;
        }
    }

    movePawn(piece, start, end) {
        const direction = piece.color === 'white' ? -1 : 1;
        const initialRow = piece.color === 'white' ? 7 : 2;
        const startRow = parseInt(start[1]);
        const endRow = parseInt(end[1]);
        const startCol = start[0];
        const endCol = end[0];

        // Mouvement initial (deux cases vers l'avant)
        if (!piece.hasMoved && endRow === startRow + 2 * direction && startRow === initialRow) {
            const middleRow = startRow + direction;
            const middleSquare = startCol + middleRow; // Case intermédiaire

            // Vérifie que la case intermédiaire et la case de destination sont vides
            if (startCol === endCol && !this.pieces[middleSquare] && !this.pieces[end]) {
                this.updatePiecePosition(piece, start, end);
                return;
            } else {

                return;
            }
        }

        // Mouvement normal (une case vers l'avant)
        if (endRow === startRow + direction) {
            // Mouvement simple vers une case vide (en ligne droite)
            if (startCol === endCol && !this.pieces[end]) {
                this.updatePiecePosition(piece, start, end);

                // Promotion si le pion atteint la dernière ligne
                if (endRow === (piece.color === 'white' ? 1 : 8)) {
                    this.promotion(end);
                }
                return;
            }

            // Capture en diagonale
            if (Math.abs(endCol.charCodeAt(0) - startCol.charCodeAt(0)) === 1 && this.pieces[end] && this.pieces[end].color !== piece.color) {
                this.updatePiecePosition(piece, start, end);

                // Promotion si le pion atteint la dernière ligne
                if (endRow === (piece.color === 'white' ? 1 : 8)) {
                    this.promotion(end);
                }
                return;
            } else {
                this.turn = this.turn === 'white' ? 'black' : 'white';
                return;
            }
        }
        this.turn = this.turn === 'white' ? 'black' : 'white';
    }

    moveRook(piece, start, end) {
        const startRow = parseInt(start[1]);
        const endRow = parseInt(end[1]);

        // Vérifie si le mouvement est en ligne droite
        if (start[0] !== end[0] && start[1] !== end[1]) {
            this.turn = this.turn === 'white' ? 'black' : 'white';
            return;
        }

        const direction = start[0] === end[0] ? (endRow > startRow ? 1 : -1) : (end[0] > start[0] ? 1 : -1);

        // Mouvement vertical
        if (start[0] === end[0]) {
            let i = startRow + direction;
            while (i !== endRow) {
                if (this.pieces[start[0] + i]) {
                    this.turn = this.turn === 'white' ? 'black' : 'white';
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
                    this.turn = this.turn === 'white' ? 'black' : 'white';
                    return;
                }
                i += direction;
            }
        }

        // Vérifie la pièce à la destination
        if (this.pieces[end] && this.pieces[end].color === piece.color) {
            this.turn = this.turn === 'white' ? 'black' : 'white';
            return;
        }

        this.updatePiecePosition(piece, start, end);
    }

    moveKing(piece, start, end) {
        const startRow = parseInt(start[1]);
        const endRow = parseInt(end[1]);

        if (Math.abs(startRow - endRow) > 1 || Math.abs(start[0].charCodeAt(0) - end[0].charCodeAt(0)) > 1) {
            this.turn = this.turn === 'white' ? 'black' : 'white';
            return;
        }

        if (this.pieces[end] && this.pieces[end].color === piece.color) {
            this.turn = this.turn === 'white' ? 'black' : 'white';

             return;
        }

        this.updatePiecePosition(piece, start, end);
    }

    promotion(position) {
        const piece = this.pieces[position];
        const lastRow = piece.color === 'white' ? '1' : '8';
        if (position[1] === lastRow) {
            const newType = prompt('Choose a piece to promote to: rook, knight, bishop, queen');

            if (newType === 'rook' || newType === 'knight' || newType === 'bishop' || newType === 'queen') {
                piece.type = newType;
            } else {
                this.promotion(position);
            }
        }
    }

    updatePiecePosition(piece, start, end) {

        piece.hasMoved = true;
        this.pieces[end] = piece;
        delete this.pieces[start];
        this.checkEchec(this.turn === 'white' ? 'black' : 'white');
    }

    moveBishop(piece, start, end) {
        const startRow = parseInt(start[1]); // Ligne de départ
        const endRow = parseInt(end[1]); // Ligne d'arrivée
        const startCol = start[0].charCodeAt(0); // Colonne de départ
        const endCol = end[0].charCodeAt(0); // Colonne d'arrivée

        // Vérifie si le mouvement est bien diagonal
        if (Math.abs(endRow - startRow) !== Math.abs(endCol - startCol)) {
            this.turn = this.turn === 'white' ? 'black' : 'white';
            return;
        }

        const rowDirection = endRow > startRow ? 1 : -1;
        const colDirection = endCol > startCol ? 1 : -1;

        let i = startRow + rowDirection;
        let j = startCol + colDirection;

        // Vérifie qu'il n'y a pas de pièces sur le chemin
        while (i !== endRow && j !== endCol) {
            if (this.pieces[String.fromCharCode(j) + i]) {
                this.turn = this.turn === 'white' ? 'black' : 'white';
                return;
            }
            i += rowDirection;
            j += colDirection;
        }

        // Vérifie la pièce à la destination
        if (this.pieces[end] && this.pieces[end].color === piece.color) {
            this.turn = this.turn === 'white' ? 'black' : 'white';
            return;
        }

        // Si tout est bon, met à jour la position de la pièce
        this.updatePiecePosition(piece, start, end);
    }


    moveQueen(piece, start, end) {
        if (this.moveBishop(piece, start, end) || this.moveRook(piece, start, end)) {
            return;
        }
        this.turn = this.turn === 'white' ? 'black' : 'white';
    }

    moveKnight(piece, start, end) {
        const startRow = parseInt(start[1]);
        const endRow = parseInt(end[1]);
        const startCol = start[0].charCodeAt(0);
        const endCol = end[0].charCodeAt(0);
        if (this.pieces[end] && this.pieces[end].color === piece.color) {
            this.turn = this.turn === 'white' ? 'black' : 'white';
            return;
        }
        if (Math.abs(startRow - endRow) === 2 && Math.abs(startCol - endCol) === 1) {  // 2 cases en ligne droite et 1 case en diagonale
            this.updatePiecePosition(piece, start, end);
        } else if (Math.abs(startRow - endRow) === 1 && Math.abs(startCol - endCol) === 2) { // 1 case en ligne droite et 2 cases en diagonale
            this.updatePiecePosition(piece, start, end);
        } else {
            this.turn = this.turn === 'white' ? 'black' : 'white';
        }
    }

    roque(piece, start, end) {
        if (piece.type !== 'king') {
            return;
        }

        const rook = this.pieces[end];
        if (!rook || rook.type !== 'rook') {
            return;
        }

        // Vérifier que ni le roi ni la tour n'ont déjà bougé
        if (piece.hasMoved || rook.hasMoved) {
            return;
        }

        // Vérifier si le roi et la tour sont de la même couleur
        if (piece.color !== rook.color) {
            return;
        }

        // Vérifier les cases entre le roi et la tour pour le grand roque
        if (start[0] === 'E' && end[0] === 'A') {  // Grand roque (tour côté dame)
            const emptySquares = piece.color === 'black' ? ['B1', 'C1', 'D1'] : ['B8', 'C8', 'D8'];
            for (let square of emptySquares) {
                if (this.pieces[square]) {
                    return;
                }
            }
            // Déplacer le roi et la tour
            this.updatePiecePosition(piece, start, piece.color === 'black' ? 'C1' : 'C8');
            this.updatePiecePosition(rook, end, piece.color === 'black' ? 'D1' : 'D8');
        }
        // Vérifier les cases entre le roi et la tour pour le petit roque
        else if (start[0] === 'E' && end[0] === 'H') {  // Petit roque (tour côté roi)
            const emptySquares = piece.color === 'black' ? ['F1', 'G1'] : ['F8', 'G8'];
            for (let square of emptySquares) {
                if (this.pieces[square]) {
                    return;
                }
            }
            // Déplacer le roi et la tour
            this.updatePiecePosition(piece, start, piece.color === 'black' ? 'G1' : 'G8');
            this.updatePiecePosition(rook, end, piece.color === 'black' ? 'F1' : 'F8');
        }

        this.turn = this.turn === 'white' ? 'black' : 'white';
    }

    checkEchec(color) {
        const kingPosition = this.findKingPosition(color);
        if (!kingPosition) {
            return false;
        }

        for (let position in this.pieces) {
            const piece = this.pieces[position];
            if (piece.color !== color) {
                if (this.isThreateningKing(piece, position, kingPosition)) {
                    this.pieces[kingPosition].isInCheck = true;
                    return true;
                }
            }
        }
        this.pieces[kingPosition].inCheck = false;
        return false;
    }

    isThreateningKing(piece, position, kingPosition) {
        switch (piece.type) {
            case 'pawn':
                return this.checkPawnEchec(piece, position, kingPosition);
            case 'rook':
                return this.checkRookEchec(piece, position, kingPosition);
            case 'king':
                return this.checkKingEchec(piece, position, kingPosition);
            case 'bishop':
                return this.checkBishopEchec(piece, position, kingPosition);
            case 'queen':
                return this.checkQueenEchec(piece, position, kingPosition);
            case 'knight':
                return this.checkKnightEchec(piece, position, kingPosition);
            default:
                return false;
        }
    }

    checkPawnEchec(piece, position, kingPosition) {
        const row = parseInt(position[1]);
        const col = position[0].charCodeAt(0);
        const kingRow = parseInt(kingPosition[1]);
        const kingCol = kingPosition[0].charCodeAt(0);

        return Math.abs(row - kingRow) === 1 && Math.abs(col - kingCol) === 1;
    }

    checkRookEchec(piece, position, kingPosition) {
        const row = parseInt(position[1]);
        const col = position[0].charCodeAt(0);
        const kingRow = parseInt(kingPosition[1]);
        const kingCol = kingPosition[0].charCodeAt(0);

        if (row === kingRow) {
            const colDirection = kingCol > col ? 1 : -1;
            for (let i = col + colDirection; i !== kingCol; i += colDirection) {
                if (this.pieces[String.fromCharCode(i) + row]) {
                    return false;
                }
            }
            return true;
        } else if (col === kingCol) {
            const rowDirection = kingRow > row ? 1 : -1;
            for (let i = row + rowDirection; i !== kingRow; i += rowDirection) {
                if (this.pieces[String.fromCharCode(col) + i]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    checkKingEchec(piece, position, kingPosition) {
        const row = parseInt(position[1]);
        const col = position[0].charCodeAt(0);
        const kingRow = parseInt(kingPosition[1]);
        const kingCol = kingPosition[0].charCodeAt(0);

        return Math.abs(row - kingRow) <= 1 && Math.abs(col - kingCol) <= 1;
    }

    checkBishopEchec(piece, position, kingPosition) {
        const row = parseInt(position[1]);
        const col = position[0].charCodeAt(0);
        const kingRow = parseInt(kingPosition[1]);
        const kingCol = kingPosition[0].charCodeAt(0);

        if (Math.abs(row - kingRow) === Math.abs(col - kingCol)) {
            const rowDirection = kingRow > row ? 1 : -1;
            const colDirection = kingCol > col ? 1 : -1;
            let i = row + rowDirection;
            let j = col + colDirection;
            while (i !== kingRow && j !== kingCol) {
                if (this.pieces[String.fromCharCode(j) + i]) {
                    return false;
                }
                i += rowDirection;
                j += colDirection;
            }
            return true;
        }
        return false;
    }

    checkQueenEchec(piece, position, kingPosition) {
        return this.checkBishopEchec(piece, position, kingPosition) || this.checkRookEchec(piece, position, kingPosition);
    }

    checkKnightEchec(piece, position, kingPosition) {
        const row = parseInt(position[1]);
        const col = position[0].charCodeAt(0);
        const kingRow = parseInt(kingPosition[1]);
        const kingCol = kingPosition[0].charCodeAt(0);

        return (Math.abs(row - kingRow) === 2 && Math.abs(col - kingCol) === 1) ||
            (Math.abs(row - kingRow) === 1 && Math.abs(col - kingCol) === 2);
    }

    findKingPosition(color) {
        for (let position in this.pieces) {
            const piece = this.pieces[position];
            if (piece.type === 'king' && piece.color === color) {
                return position;
            }
        }
        return null;
    }





    echecEtMat() {
        const kingPosition = this.findKingPosition(this.turn);
        if (!kingPosition) {
            return false;
        }

        // Vérifier si le roi est en échec
        if (!this.checkEchec(this.turn)) {
            return false;
        }
        let color = this.turn;

        for (let position in this.pieces) {
            const piece = this.pieces[position];

            if (piece.color !== color) {
                continue;
            }

            const possibleMoves = [
                'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8',
                'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8',
                'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8',
                'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8',
                'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8',
                'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8',
                'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8',
                'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8'
            ];

            for (let move of possibleMoves) {

                const originalPosition = { ...this.pieces[position] };
                const originalEndPiece = this.pieces[move] ? { ...this.pieces[move] } : null;

                // Simuler le mouvement
                this.move(position, move);
                this.turn = color;


                if (!this.checkEchec(color)) {

                    this.pieces[position] = originalPosition;
                    if (originalEndPiece) {
                        this.pieces[move] = originalEndPiece;
                    } else {
                        delete this.pieces[move];
                    }
                    console.log('Mouvement valide trouvé de', position, 'à', move);
                    return false;
                }


                this.pieces[position] = originalPosition;
                if (originalEndPiece) {
                    this.pieces[move] = originalEndPiece;
                } else {
                    delete this.pieces[move];
                }
            }
        }

        return true;
    }

    pat() {
        const color = this.turn;
        for (let position in this.pieces) {
            const piece = this.pieces[position];
            if (piece.color === color) {
                const moves= [
                    'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8',
                    'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8',
                    'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8',
                    'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8',
                    'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8',
                    'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8',
                    'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8',
                    'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8'
                ];
                for (let move of moves) {
                    const originalPosition = { ...piece };
                    const originalEndPiece = this.pieces[move];
                    this.move(position, move);
                    this.turn = color;
                    // Si la tableau apres le mouvement et n'est pas comme avant le mouvement alors un pion peut encore bouger et donc pas de pat
                    if(originalPosition !== this.pieces[position] && originalEndPiece !== this.pieces[move]){
                        this.pieces[position] = originalPosition;
                        if (originalEndPiece) {
                            this.pieces[move] = originalEndPiece;
                        } else {
                            delete this.pieces[move];
                        }
                        console.log('Mouvement valide trouvé de', position, 'à', move);
                        return false;
                    }


                }
            }
        }
        return true;
    }


}

export default Chess;
