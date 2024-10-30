#!/bin/bash

#file sans extension
filename=$1

nasm -f elf64 "$filename.asm" -o "$filename.o"
ld "$filename.o" -o "$filename"
./"$filename"
