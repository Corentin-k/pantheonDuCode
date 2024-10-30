section .data ; Toutes les données
    bienvenue db "Bienvenue dans TicTacToe Game!", 0xA
    bienvenue_len equ $ - bienvenue
    position_msg1 db "Joueur 1 (X) : Entrez une position (0-8): ", 0
    position_msg1_len equ $ - position_msg1                             ; Recupere la longueur d'une chaine de caractère
    position_msg2 db "Joueur 2 (O) : Entrez une position (0-8): ", 0
    position_msg2_len equ $ - position_msg2
    separation db "---------", 0xA
    separation_len equ $ - separation
    ligne_bar db " | "
    ligne_bar_len equ $ - ligne_bar
    jump_line db 0xA
    empty_char db "_"w
    x_char db "X"
    o_char db "O"
    clear_seq db 0x1B, '[', 'H', 0x1B, '[', '2', 'J', 0
    clear_seq_len equ $ - clear_seq
    table db 0, 0, 0, 0, 0, 0, 0, 0, 0
    position db 0
    invalid_position db "Position invalide", 0xA
    invalid_position_len equ $ - invalid_position
    joueur db 1
    rejouer_message db "Voulez-vous rejouer (o,n) ? : ", 0
    rejouer_message_len equ $ - rejouer_message
rejouer db 0

    player1 db "Joueur 1 (X) a gagné ", 0xA
    player1_len equ $ - player1
    player2 db "Joueur 2 (O) a gagné ", 0xA
    player2_len equ $ - player2



;   ;Toutes les combinaisons gagnantes
    combinaisons_gagnantes db 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 3, 6, 1, 4, 7, 2, 5, 8, 0, 4, 8, 2, 4, 6


section .text
    global _start

; Début du programme
_start:
    call clear_terminal

    ; Strucuture classique d'un affichage en assembleur
    mov rax, 1                  ; 1- syscall: write
    mov rdi, 1                  ; 2- stdout
    mov rsi, bienvenue          ; 3- message
    mov rdx, bienvenue_len      ; 4- longueur du message
    syscall                     ; 5- appel du système

; Boucle principale du jeu
.loop:
    call afficher_grille
    call recupererPosition
    cmp rax, 1
    je .loop ; Si la position est invalide, on redemande la position
    call clear_terminal 
    call check_gagnant ; Vérifier si un joueur a gagné

    ; Changer de joueur
    mov al, [joueur]
    cmp al, 1
    je .au_joeur2 ; Si le joueur actuel est 1, passer à 2
    jmp .au_joueur1; Sinon, passer à 1

.au_joueur1:
    mov byte [joueur], 1 ;Changer le joueur actuel à 1
    jmp .loop            ; Revenir à la boucle principale

.au_joeur2:
    mov byte [joueur], 2 ;Changer le joueur actuel à 2
    jmp .loop            ; Revenir à la boucle principale


check_gagnant:
    mov rdi, 0 ; rdi = 0 aucun gagnant n'a été trouvé
    mov rcx, 0 ; rcx = 0 index de la combinaison gagnante

.check_combinaisons:
    lea rsi, [combinaisons_gagnantes + rcx] ;lea permet de charger l'adresse de la combinaison gagnante dans rsi contrairement à mov qui charge la valeur
    call check_combinaison ; combinaison est gagnante ?
    cmp rax, 1             ; un gagnant a été trouvé ?
    je gagnant_trouve       ; Si un gagnant a été trouvé, afficher le message de victoire et quitter

    add rcx, 3 ; Sinon Passer à la combinaison suivante
    cmp rcx, 24 ; Vérifier si toutes les combinaisons ont été vérifiées
    jl .check_combinaisons ; Si non, vérifier la combinaison suivante
    ret

check_combinaison:
     
    ; mov change uniquement les bits de destination correspondant à la taille de la source,
; contrairement à movzx qui remplit les bits plus élevés avec des zéros pour nettoyer le registre.

    movzx r10, byte [rsi]          ; Charger l'index de la première position 
    mov al, byte [table + r10]     ; Charger la valeur de la première position dans AL
    cmp al, 0                      ; Si la valeur est 0, la combinaison n'est pas gagnante
    je .combinaison_non_gagnante ; Sinon, continuer la vérification

    movzx r10, byte [rsi + 1]      
    cmp al, byte [table + r10]     
    jne .combinaison_non_gagnante

    movzx r10, byte [rsi + 2]      
    cmp al, byte [table + r10]   
    jne .combinaison_non_gagnante

    mov rax, 1                     ; rax = 1  un gagnant !!!
    ret

.combinaison_non_gagnante:
    mov rax, 0                     ; rax = 0 combinaison pas gagnante
    ret ; Retourner à la fonction appelante = check_gagant


gagnant_trouve:

    call afficher_grille 
    ; Choisir le message de victoire selon le joueur actuel
    mov al, [joueur]
    cmp al, 1
    je .gagnant_joueur1 
    mov rsi, player2 
    mov rdx, player2_len
    jmp .gagnant_message

.gagnant_joueur1:
    mov rsi, player1
    mov rdx, player1_len

.gagnant_message:
  
    mov rax, 1
    mov rdi, 1
    syscall 

    ;Demander pour rejouer
     mov rax, 1                  
    mov rdi, 1                  
    mov rsi, rejouer_message    
    mov rdx, rejouer_message_len
    syscall                     
    .get_rejouer:

        
        mov rax, 0                 
        mov rdi, 0                
        mov rsi, rejouer           
        mov rdx, 1                  
        syscall                 

    cmp byte [rejouer], 0xA
    je .get_rejouer

    ; remettre toute les vairable a zero
    mov rcx, 9               ; Taille du tableau
    lea rsi, [table]       

    .clear_table:
        mov byte [rsi], 0    
        inc rsi              
        loop .clear_table
    
    mov byte[joueur],1

    cmp byte [rejouer], 'o'     ; comparer avec 'o'
    je _start                   ; si 'o', redémarrer le jeu

    ;sinon quitter
    mov rax, 60                 
    xor rdi, rdi              
    syscall




;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;;;;;;;;RECUPERATION DE LA POSITION;;;;;;;;;;;;;;;;;;;;;;;;;;


recupererPosition:
    ; Choisir le message de position selon le joueur actuel
    mov al, [joueur]
    cmp al, 1
    je .show_player1_message ; 
    mov rsi, position_msg2 
    mov rdx, position_msg2_len
    
    ;Une fois les les bon message chargé dans les registres, on peut afficher le message
    jmp .position_message 


.show_player1_message:
    mov rsi, position_msg1
    mov rdx, position_msg1_len

.position_message:
    mov rax, 1
    mov rdi, 1
    syscall

.demander_position:
    ; Obtenir la position de l'utilisateur
    mov rax, 0        ; syscall: read
    mov rdi, 0        ; stdin
    mov rsi, position ; Adresse de la variable position
    mov rdx, 1        ; Taille de la variable position
    syscall
    cmp byte [position], 0xA  ;;; supp les entrée si y en a dans le buffer
    je .demander_position   
    

    sub byte [position], '0'  ; Convertir le caractère ASCII en entier

    ; Vérifier si la position est valide
    movzx rbx, byte [position]  
    cmp rbx, 0
    jl .invalid_position
    cmp rbx, 8
    jg .invalid_position
    
    ; Vérifier si la position est déjà occupée par un joueur (1 ou 2)
    mov al, [table + rbx]  
    cmp al, 0    ; 0 = innocuper
    jne .invalid_position 

   
    mov al, [joueur]  ; Récupérer le joueur actuel
    mov [table + rbx], al  ; 1 pour 'X' et 2 pour 'O'
    mov byte [position], 0  ; Réinitialiser la position
    
    xor rax, rax  ; Remmettre rax à 0 pour indiquer le succès
    ret

.invalid_position:
    ; Afficher le message d'erreur
    mov rax, 1
    mov rdi, 1
    mov rsi, invalid_position
    mov rdx, invalid_position_len
    syscall

    mov rax, 1  ; 1 = position invalide
    ret











;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;;;;;;;;;;;;AFFICHAGE;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;





clear_terminal:
    mov rax, 1               ; syscall: write
    mov rdi, 1               ; stdout
    mov rsi, clear_seq       ; séquence d'échappement
    mov rdx, clear_seq_len   ; longueur de la séquence
    syscall
    ret

afficher_grille:
    ; Afficher les lignes de la grille
    call afficher_ligne_0
    call .separationLigne
    call afficher_ligne_1
    call .separationLigne
    call afficher_ligne_2
    ret

.separationLigne:
    mov rax, 1
    mov rdi, 1
    mov rsi, separation
    mov rdx, separation_len
    syscall
    ret

afficher_ligne_0:
    mov rbx, 0
    call afficher_case
    mov rbx, 1
    call afficher_case
    mov rbx, 2
    call afficher_case
    call afficher_saut_ligne
    ret

afficher_ligne_1:
    mov rbx, 3
    call afficher_case
    mov rbx, 4
    call afficher_case
    mov rbx, 5
    call afficher_case
    call afficher_saut_ligne
    ret

afficher_ligne_2:
    mov rbx, 6
    call afficher_case
    mov rbx, 7
    call afficher_case
    mov rbx, 8
    call afficher_case
    call afficher_saut_ligne
    ret

afficher_saut_ligne:
    mov rax, 1
    mov rdi, 1
    mov rsi, jump_line
    mov rdx, 1
    syscall
    ret

afficher_case:
   
    mov al, [table + rbx]

    ; Sélectionner le caractère à afficher selon la valeur de la case
    cmp al, 0         ; case vide
    je .afficher_vide ; joueur 1
    cmp al, 1
    je .afficher_x
    cmp al, 2           ;joueur 2
    je .afficher_o

.afficher_vide:
    mov rsi, empty_char
    jmp .afficher_case

.afficher_x:
    mov rsi, x_char
    jmp .afficher_case

.afficher_o:
    mov rsi, o_char
    jmp .afficher_case

.afficher_case:

    mov rax, 1
    mov rdi, 1
    mov rdx, 1
    syscall

    ; Ne pas afficher la barre de séparation après la dernière case
    cmp rbx, 8
    je .skip_barre
    cmp rbx, 2
    je .skip_barre
    cmp rbx, 5
    je .skip_barre

    ; Afficher la barre de séparation
    mov rax, 1
    mov rdi, 1
    mov rsi, ligne_bar
    mov rdx, ligne_bar_len
    syscall
.skip_barre:
    ret
