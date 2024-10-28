section .data
msg_equal db "rax est egal a 10", 0xA   ; Message si rax == 10
msg_notequal db "rax n'est pas egal a 10", 0xA ; Message si rax != 10

section .text
global _start

_start:
    mov rax, 10            ; Pour cet exemple, mettre 10 dans rax
    cmp rax, 10            ; Comparer rax avec 10
    je if_equal            ; Si rax == 10, sauter à `if_equal`

    ; Bloc "else" (si rax != 10)
    mov rsi, msg_notequal  ; Adresse du message "non égal"
    mov rdx, 19            ; Longueur du message
    jmp print_message      ; Sauter au code d'affichage du message

if_equal:
    ; Bloc "if" (si rax == 10)
    mov rsi, msg_equal     ; Adresse du message "égal"
    mov rdx, 16            ; Longueur du message

print_message:
    ; Code commun pour afficher le message
    mov rax, 1             ; Syscall pour write
    mov rdi, 1             ; Descripteur pour stdout
    syscall                ; Exécuter la syscall

    ; Terminer le programme
    mov rax, 60            ; Syscall pour exit
    xor rdi, rdi           ; Code de retour 0
    syscall                ; Exécuter la syscall
