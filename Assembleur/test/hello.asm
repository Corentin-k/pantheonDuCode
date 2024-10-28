section .data
msg db "Hello, Ubuntu!", 0xA  ; Le texte à afficher avec un saut de ligne
len equ $ - msg               ; Calcul de la longueur du message

section .text
global _start                 ; Point d'entrée du programme

_start:
    ; Appel de la syscall write (syscall numéro 1)
    mov rax, 1                ; 1 = numéro de la syscall pour write
    mov rdi, 1                ; 1 = descripteur de fichier pour stdout
    mov rsi, msg              ; Adresse du message à écrire
    mov rdx, len              ; Longueur du message
    syscall                   ; Appel de la syscall

    ; Appel de la syscall exit (syscall numéro 60) pour terminer le programme
    mov rax, 60               ; 60 = numéro de la syscall pour exit
    xor rdi, rdi              ; 0 = code de retour
    syscall                   ; Appel de la syscall
