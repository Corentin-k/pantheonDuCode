# Tic Tac Toe en Assembleur #Poc_1P

---

<a href="https://poc.onepantheon.fr/html/defi.html"><img src="image.png" width="200px" /></a>

# Description

Jeu de Tic Tac Toe en Assembleur

Subtilité : Les postions sont entre 0 et 8 de cette façon :

```text
0 | 1 | 2
---------
3 | 4 | 5
---------
6 | 7 | 8
```

# Lancer le programme

```bash
./run.sh tictactoe
```

ou

# Assemble le code

nasm -f elf64 -o tictactoe.o tictactoe.asm

# Lie l'assembleur en exécutable

ld -o tictactoe tictactoe.o

# Exécute le programme

./tictactoe

https://www.linuxassembly.org/startup.html
https://www.youtube.com/watch?v=BWRR3Hecjao
https://chatgpt.com/share/671d1f49-3e8c-800b-bee6-434c0fc77baa
