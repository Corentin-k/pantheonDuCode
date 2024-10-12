import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.logging.Level;
import java.util.logging.Logger;

public class TerminalSizeUtility {

    private static final Logger logger = Logger.getLogger(TerminalSizeUtility.class.getName());

    public static void main(String[] args) {
        detectOSTerminalSize();
    }

    // Fonction qui détecte l'OS et exécute les bonnes commandes
    public static void detectOSTerminalSize() {
        String os = System.getProperty("os.name").toLowerCase();
        if (os.contains("win")) {
            System.out.println("Système d'exploitation : Windows");
            getTerminalSizeWindows();
        } else if (os.contains("nix") || os.contains("nux") || os.contains("mac")) {
            System.out.println("Système d'exploitation : Linux/Unix/Mac");
            getTerminalSizeUnix();
        } else {
            System.out.println("Système d'exploitation inconnu.");
        }
    }

    // Récupérer la taille du terminal sous Windows
    public static void getTerminalSizeWindows() {
        try {
            Process process = Runtime.getRuntime().exec(new String[]{"cmd.exe", "/c", "mode con"});
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            int cols = -1, rows = -1;

            while ((line = reader.readLine()) != null) {
                if (line.contains("Columns")) {
                    cols = Integer.parseInt(line.split(":")[1].trim());
                } else if (line.contains("Lines")) {
                    rows = Integer.parseInt(line.split(":")[1].trim());
                }
            }

            System.out.println("Taille du terminal : " + rows + " lignes, " + cols + " colonnes");
            reader.close();
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Erreur lors de la récupération de la taille du terminal sur Windows", e);
        }
    }

    // Récupérer la taille du terminal sous Linux/Unix/Mac
    public static void getTerminalSizeUnix() {
        try {
            Process process = Runtime.getRuntime().exec(new String[]{"sh", "-c", "tput cols && tput lines"});
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            int cols = -1, rows = -1;

            if ((line = reader.readLine()) != null) {
                cols = Integer.parseInt(line);  // Nombre de colonnes
            }
            if ((line = reader.readLine()) != null) {
                rows = Integer.parseInt(line);  // Nombre de lignes
            }

            System.out.println("Taille du terminal : " + rows + " lignes, " + cols + " colonnes");
            reader.close();
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Erreur lors de la récupération de la taille du terminal sur Linux/Unix/Mac", e);
        }
    }
}
