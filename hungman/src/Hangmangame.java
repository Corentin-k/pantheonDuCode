// Gère la logique principale du jeu.
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.Scanner;

public class Hangmangame {
    static String wordToFind;
    static int language;
    static int life = 10;

    // Utilise Hangmangame.class pour le logger
    private static final Logger logger = Logger.getLogger(Hangmangame.class.getName());

    // Affichage des vies
    public static void seeLife() {
        for (int i = 0; i < life; i++) {
            System.out.print("♥");  // Vie restante
        }
        for (int i = 0; i < 5 - life; i++) {
            System.out.print("♡");  // Vie perdue
        }
        System.out.println(); // Saut de ligne après affichage des vies
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        seeLife();  // Affiche les vies initiales



        // Choisissez la langue et le mot à trouver
//        System.out.println("Choisissez votre langue : 1 - Français, 2 - Anglais, 3 - Espagnol");
//        language = sc.nextInt();
//        sc.nextLine();
//        System.out.println("Mot à trouver :");
//        wordToFind = sc.nextLine();

    }
}
