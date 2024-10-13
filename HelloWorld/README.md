Hello World #POC_1P
---

<a href="https://poc.onepantheon.fr/html/defi.html"><img src="img.png" width="200px" /></a>


Pensez à bien modifier :

- OutputDir : OutputDir = Chemin vers le dossier où vous souhaitez que l'installateur soit créé.

- Source : Chemin vers le fichier exécutable HelloWorld.exe

---

( le fichier HelloWorldInstallateur.exe est le résultat du code .iss)

C'est écrit en InnoSetup (basé sur du Pascal) et C++. C'est un installateur d'app .

Description

Le code est dans le fichier HelloWorld.iss. Cet installateur génère un fichier exécutable nommé HelloWorldInstallateur.exe.

L'installateur affiche bien comme demandé "Hello World"
et installe une autre application codée en c++ qui affiche lui aussu hello world

Instructions

Compiler le code :

Ouvrez le fichier HelloWorld.iss dans InnoSetup

Compilez le projet pour générer le fichier HelloWorldInstallateur.exe.

Installation :

Exécutez HelloWorldInstallateur.exe pour installer l'application.

Exécution :

Une fois passer l'instalateur, une app a été créé lancé là ! ( y a rien, y aura juste écrit Helloworld en c++)
