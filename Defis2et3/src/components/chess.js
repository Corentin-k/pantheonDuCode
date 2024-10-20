// src/Chess.js
class Chess {
    constructor(pieces) {
        this.pieces = pieces;
        this.turn = 'white';
    }

    move(start, end) {
        const piece = this.pieces[start];
        if (!piece) {
            console.log("error: Il n'y a pas de pièce à cet emplacement");
            return;
        }
        if (piece.color !== this.turn) {
            console.log("error: Ce n'est pas votre tour");
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
                this.roque(piece, start, end);
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
            alert("error: Mouvement non valide, le roi serait en échec");

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
                console.log("error: Il y a une pièce sur le chemin ou à la destination, ou mouvement latéral interdit");
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
                console.log("error: Mouvement latéral interdit sauf pour capturer ou pas de pièce à capturer");
                return;
            }
        }

        // Si le mouvement ne correspond à aucun des cas valides
        console.log("error: Le pion ne peut pas se déplacer de cette façon");
    }

    moveRook(piece, start, end) {
        const startRow = parseInt(start[1]);
        const endRow = parseInt(end[1]);

        // Vérifie si le mouvement est en ligne droite
        if (start[0] !== end[0] && start[1] !== end[1]) {
            console.log("error: La tour ne peut se déplacer que horizontalement ou verticalement");
            return;
        }

        const direction = start[0] === end[0] ? (endRow > startRow ? 1 : -1) : (end[0] > start[0] ? 1 : -1);

        // Mouvement vertical
        if (start[0] === end[0]) {
            let i = startRow + direction;
            while (i !== endRow) {
                if (this.pieces[start[0] + i]) {
                    console.log("error: Il y a une pièce sur le chemin");
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
                    console.log("error: Il y a une pièce sur le chemin");
                    return;
                }
                i += direction;
            }
        }

        // Vérifie la pièce à la destination
        if (this.pieces[end] && this.pieces[end].color === piece.color) {
            console.log("error: Vous ne pouvez pas capturer votre propre pièce");
            return;
        }

        this.updatePiecePosition(piece, start, end);
    }

    moveKing(piece, start, end) {
        const startRow = parseInt(start[1]);
        const endRow = parseInt(end[1]);

        if (Math.abs(startRow - endRow) > 1 || Math.abs(start[0].charCodeAt(0) - end[0].charCodeAt(0)) > 1) {
            console.log("error: Le roi ne peut bouger que d'une case dans n'importe quelle direction");
            return;
        }

        if (this.pieces[end] && this.pieces[end].color === piece.color) {
            console.log("error: Vous ne pouvez pas capturer votre propre pièce");
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
                console.log("error: Type de pièce non valide");
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
        const startCol = start[0].charCodeAt(0);// Colonne de départ
        const endCol = end[0].charCodeAt(0);// Colonne d'arrivée

        // pas en diagonale
        if (startRow === endRow || startCol === endCol) {
            console.log("error: Le fou ne peut se déplacer que en diagonale");
            return;
        }

        const rowDirection = endRow > startRow ? 1 : -1;
        const colDirection = endCol > startCol ? 1 : -1;

        let i = startRow + rowDirection;
        let j = startCol + colDirection;
        while (i !== endRow) {
            if (this.pieces[String.fromCharCode(j) + i]) {
                console.log("error: Il y a une pièce sur le chemin");
                return;
            }
            i += rowDirection;
            j += colDirection;
        }

        // Vérifie la pièce à la destination
        if (this.pieces[end] && this.pieces[end].color === piece.color) {
            console.log("error: Vous ne pouvez pas capturer votre propre pièce");
            return;
        }

        this.updatePiecePosition(piece, start, end);
    }

    moveQueen(piece, start, end) {
        if (this.moveBishop(piece, start, end) || this.moveRook(piece, start, end)) {
            return;
        }
        console.log("error: Mouvement non valide pour la reine");
    }

    moveKnight(piece, start, end) {
        const startRow = parseInt(start[1]);
        const endRow = parseInt(end[1]);
        const startCol = start[0].charCodeAt(0);
        const endCol = end[0].charCodeAt(0);
        if (this.pieces[end] && this.pieces[end].color === piece.color) {
            console.log("error: Vous ne pouvez pas capturer votre propre pièce");
            return;
        }
        if (Math.abs(startRow - endRow) === 2 && Math.abs(startCol - endCol) === 1) {  // 2 cases en ligne droite et 1 case en diagonale
            this.updatePiecePosition(piece, start, end);
        } else if (Math.abs(startRow - endRow) === 1 && Math.abs(startCol - endCol) === 2) { // 1 case en ligne droite et 2 cases en diagonale
            this.updatePiecePosition(piece, start, end);
        } else {
            console.log("error: Le cavalier ne peut se déplacer que de deux cases dans une direction et une case dans une direction perpendiculaire");
        }
    }

    roque(piece, start, end) {
        if (piece.type !== 'king') {
            console.log("error: La pièce n'est pas un roi");
            return;
        }

        const rook = this.pieces[end];
        if (!rook || rook.type !== 'rook') {
            console.log("error: La pièce à la destination n'est pas une tour");
            return;
        }

        // Vérifier que ni le roi ni la tour n'ont déjà bougé
        if (piece.hasMoved || rook.hasMoved) {
            console.log("error: Le roi ou la tour a déjà bougé");
            return;
        }

        // Vérifier si le roi et la tour sont de la même couleur
        if (piece.color !== rook.color) {
            console.log("error: Le roi et la tour ne sont pas de la même couleur");
            return;
        }

        // Vérifier les cases entre le roi et la tour pour le grand roque
        if (start[0] === 'E' && end[0] === 'A') {  // Grand roque (tour côté dame)
            const emptySquares = piece.color === 'black' ? ['B1', 'C1', 'D1'] : ['B8', 'C8', 'D8'];
            for (let square of emptySquares) {
                if (this.pieces[square]) {
                    console.log("error: Il y a une pièce entre le roi et la tour");
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
                    console.log("error: Il y a une pièce entre le roi et la tour");
                    return;
                }
            }
            // Déplacer le roi et la tour
            this.updatePiecePosition(piece, start, piece.color === 'black' ? 'G1' : 'G8');
            this.updatePiecePosition(rook, end, piece.color === 'black' ? 'F1' : 'F8');
        } else {
            console.log("error: Mouvement de roque non valide");
        }

        this.turn = this.turn === 'white' ? 'black' : 'white';
    }

    checkEchec(color) {
        const kingPosition = this.findKingPosition(color);
        if (!kingPosition) {
            console.error('Roi introuvable pour la couleur :', color);
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
}

export default Chess;
