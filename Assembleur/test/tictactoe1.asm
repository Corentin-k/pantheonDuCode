section .data
    bienvenue db "Bienvenue dans TicTacToe Game!", 0xA
    bienvenue_len equ 31
    separation db "---------", 0xA
    separation_len equ 10
    ligne_bar db " | "
    ligne_bar_len equ 3
    jump_line db 0xA
    empty_char db " "
    x_char db "X"
    o_char db "O"

    table db 0, 1, 2, 0, 0, 1, 1, 0, 0  

section .text
    global _start

_start:
    
    mov rax, 1
    mov rdi, 1
    mov rsi, bienvenue
    mov rdx, bienvenue_len
    syscall

    call afficher_grille

    mov rax, 60
    xor rdi, rdi
    syscall

afficher_grille:
   
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
   
    mov rax, 1
    mov rdi, 1
    mov rsi, jump_line
    mov rdx, 1
    syscall
    ret

afficher_ligne_1:
   
    mov rbx, 3
    call afficher_case
    mov rbx, 4
    call afficher_case
    mov rbx, 5
    call afficher_case
   
    mov rax, 1
    mov rdi, 1
    mov rsi, jump_line
    mov rdx, 1
    syscall
    ret

afficher_ligne_2:
   
    mov rbx, 6
    call afficher_case
    mov rbx, 7
    call afficher_case
    mov rbx, 8
    call afficher_case
   
    mov rax, 1
    mov rdi, 1
    mov rsi, jump_line
    mov rdx, 1
    syscall
    ret

afficher_case:
   
    mov al, [table + rbx]

    
    cmp al, 0
    je .afficher_vide
    cmp al, 1
    je .afficher_x
    cmp al, 2
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

    cmp rbx, 8
    je .skip_barre
    cmp rbx, 2
    je .skip_barre
    cmp rbx, 5
    je .skip_barre

    mov rax, 1
    mov rdi, 1
    mov rsi, ligne_bar
    mov rdx, ligne_bar_len
    syscall

.skip_barre:
    ret
