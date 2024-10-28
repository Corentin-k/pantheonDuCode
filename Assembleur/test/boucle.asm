section .data
message db "Iteration", 0xA    ; Message à afficher avec un saut de ligne

section .bss
buffer resb 1                 ; Buffer pour stocker l'index en ASCII

section .text
global _start

_start:
    mov rcx, 0                ; Initialiser `i` à 0 (registre `rcx` utilisé pour `i`)
    mov rbx, 5                ; Limite de la boucle (valeur 5)

loop_start:
    cmp rcx, rbx              ; Comparer `i` (rcx) avec la limite (rbx)
    jge loop_end              ; Si `i >= 5`, sortir de la boucle

    ; Corps de la boucle
    mov rsi, message          ; Charger l'adresse du message
    mov rdx, 9                ; Longueur du message
    mov rax, 1                ; Syscall pour `write`
    mov rdi, 1                ; Descripteur de fichier `stdout`
    syscall                   ; Exécuter la syscall (afficher le message)

    ; Incrémenter `i`
    inc rcx                   ; rcx = rcx + 1

    ; Revenir au début de la boucle
    jmp loop_start            ; Revenir à `loop_start`

loop_end:
    ; Fin du programme
    mov rax, 60               ; Syscall pour `exit`
    xor rdi, rdi              ; Code de retour 0
    syscall                   ; Exécuter la syscall
