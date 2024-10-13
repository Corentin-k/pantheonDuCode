# Hello World #POC_1P

<a href="https://poc.onepantheon.fr/html/defi.html"><img src="img.png" width="200px" /></a>

Pensez à bien modifier :

- **OutputDir** : Chemin vers le dossier où vous souhaitez que l'installateur soit créé.
- **Source** : Chemin vers le fichier exécutable `HelloWorld.exe`.

---

(Le fichier `HelloWorldInstallateur.exe` est le résultat du code `.iss`.)

C'est écrit en Inno Setup (basé sur du Pascal) et C++. C'est un installateur d'application.

## Description

Le code est dans le fichier `HelloWorld.iss`. Cet installateur génère un fichier exécutable nommé `HelloWorldInstallateur.exe`.

L'installateur affiche bien, comme demandé, "Hello World" et installe une autre application codée en C++ qui affiche aussi "Hello World".

## Instructions

### Compiler le code :

Ouvrez le fichier `HelloWorld.iss` dans Inno Setup.

Compilez le projet pour générer le fichier `HelloWorldInstallateur.exe`.

### Installation :

Exécutez `HelloWorldInstallateur.exe` pour installer l'application.

### Exécution :

Une fois l'installateur passé, une application a été créée et lancée ! (Il n'y a rien, il y aura juste écrit "Hello World" en C++).

