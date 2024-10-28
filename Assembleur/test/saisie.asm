section .data
buffer db 0                ; Zone mémoire pour stocker l'entrée utilisateur (un caractère)
buffer_size equ 1          ; Taille du buffer en octets (1 caractère)

section .text
global _start

_start:
    ; Lire une saisie utilisateur
    mov rax, 0             ; Numéro de la syscall `read`
    mov rdi, 0             ; Descripteur de fichier `stdin`
    mov rsi, buffer        ; Adresse du buffer où la saisie sera stockée
    mov rdx, buffer_size   ; Nombre maximal de caractères à lire
    syscall                ; Exécuter la syscall

    ; Afficher la saisie utilisateur
    mov rax, 1             ; Numéro de la syscall `write`
    mov rdi, 1             ; Descripteur de fichier `stdout`
    mov rsi, buffer        ; Adresse du buffer (données lues)
    mov rdx, buffer_size   ; Nombre d'octets à écrire
    syscall                ; Exécuter la syscall

    ; Terminer le programme
    mov rax, 60            ; Numéro de la syscall `exit`
    xor rdi, rdi           ; Code de retour 0
    syscall                ; Exécuter la syscall
