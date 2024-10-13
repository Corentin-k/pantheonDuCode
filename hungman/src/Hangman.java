import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.ResourceBundle;
import java.util.Locale;

//https://jenkov.com/tutorials/java-internationalization/resourcebundle.html
//https://www.tutorialspoint.com/java_i18n/java_i18n_resourcebundle.htm
public class Hangman {
    static String wordToFind;
    static String sansAccentwordToFind; // Variable pour stocker le mot original

    static String language;
    static int life = 10;
    static final int maxLife = 10;
    static StringBuilder guessedWord;
    static ArrayList<Character> letterAlreadyUsed = new ArrayList<>();

    public static String[] frenchWord={
            "chat","chien","ordinateur","voiture","maison","livre","école","jardin","table","soleil","lune",
            "fromage","plage","montagne","rivière","pomme","banane","orange","eau","feu","vent","terre","ciel","arbre",
            "fleur","herbe","oiseau","poisson","lion","tigre","éléphant","vache","mouton","poule","souris","cheval",
            "requin","baleine","océan","lac","forêt","désert","ville","village","ami","famille","père","mère","frère",
            "sœur","amour","haine","joie","tristesse","vérité","mensonge","paix","guerre","lumière","ombre","chaud",
            "froid","printemps","été","automne","hiver","courir","sauter","nager","marcher","voler","penser","ressentir",
            "parler","écouter","voir","regarder","toucher","lire","écrire","manger","boire","dormir","jouer","travailler",
            "voyager","apprendre","enseigner","ouvrir","fermer","commencer","finir","acheter","vendre","trouver","perdre",
            "aider","attendre","appeler","compter","rire","pleurer","cuisine", "voisin", "fenêtre", "porte", "éclair", "orage", "pluie", "neige", "chaise", "lampe",
            "vélo", "train", "avion", "bateau", "gare", "aéroport", "clé", "moteur", "pétrole", "essence",
            "livraison", "colis", "bureau", "magasin", "usine", "hôpital", "église", "musée", "cinéma", "théâtre",
            "bibliothèque", "quartier", "route", "chemin", "rue", "parc", "jardin", "champ", "colline", "vallée",
            "île", "péninsule", "côte", "golfe", "phare", "pont", "tunnel", "tour", "ascenseur", "escalier",
            "chaussure", "chemise", "pantalon", "robe", "montre", "bracelet", "lunettes", "chapeau", "ceinture", "sac",
            "journal", "carte", "clavier", "souris", "téléphone", "ordinateur", "bague", "collier", "bouteille", "verre",
            "tasse", "assiette", "fourchette", "couteau", "cuillère", "éponge", "serviette", "savon", "shampooing", "peigne",
            "brosse", "lit", "matelas", "oreiller", "couverture", "drap", "tableau", "affiche", "miroir", "photo",
            "caméra", "imprimante", "radio", "télévision", "enceinte", "micro", "casque", "ampoule", "bougie", "lampe",
            "rideau", "placard", "étagère", "commode", "bureau", "fauteuil", "canapé", "chaise longue", "climatiseur", "ventilateur",
            "radiateur", "chauffage", "poêle", "réfrigérateur", "congélateur", "four", "micro-ondes", "lave-vaisselle", "lave-linge", "sèche-linge",
            "toilettes", "lavabo", "douche", "baignoire", "bain", "évier", "poubelle", "balai", "aspirateur", "serpillère",
            "bicyclette", "skateboard", "trottinette", "moto", "bus", "tram", "métro", "vélo", "camion", "voiture",
            "caravane", "roulotte", "remorque", "yacht", "voilier", "ferry", "hélicoptère", "fusée", "satellite", "drone"
    };
    public static String[] espagnolWords= {
            "cat", "dog", "computer", "car", "house", "book", "school", "garden", "table", "sun", "moon", "cheese", "beach", "mountain", "river", "apple", "banana", "orange", "water", "fire", "wind", "earth", "sky", "tree", "flower", "grass", "bird", "fish", "lion", "tiger", "elephant", "cow", "sheep", "chicken", "mouse", "horse", "shark", "whale", "ocean", "lake", "forest", "desert", "city", "village", "friend", "family", "father", "mother", "brother", "sister", "love", "hate", "happiness", "sadness", "truth", "lie", "peace", "war", "light", "dark", "hot", "cold", "spring", "summer", "autumn", "winter", "run", "jump", "swim", "walk", "fly", "think", "feel", "speak", "listen", "see", "look",
            "touch", "read", "write", "eat", "drink", "sleep", "play", "work", "travel", "learn", "teach", "open", "close", "start", "finish", "buy", "sell", "find", "lose", "help", "wait", "call", "count", "laugh", "cry", "kitchen", "neighbor", "window", "door", "lightning", "storm", "rain", "snow", "chair", "lamp",
            "bicycle", "train", "plane", "boat", "station", "airport", "key", "engine", "oil", "gasoline",
            "delivery", "package", "office", "store", "factory", "hospital", "church", "museum", "cinema", "theater",
            "library", "neighborhood", "road", "path", "street", "park", "garden", "field", "hill", "valley",
            "island", "peninsula", "coast", "gulf", "lighthouse", "bridge", "tunnel", "tower", "elevator", "stairs",
            "shoe", "shirt", "pants", "dress", "watch", "bracelet", "glasses", "hat", "belt", "bag",
            "newspaper", "map", "keyboard", "mouse", "phone", "computer", "ring", "necklace", "bottle", "glass",
            "cup", "plate", "fork", "knife", "spoon", "sponge", "towel", "soap", "shampoo", "comb",
            "brush", "bed", "mattress", "pillow", "blanket", "sheet", "painting", "poster", "mirror", "photo",
            "camera", "printer", "radio", "television", "speaker", "microphone", "headphones", "bulb", "candle", "lamp",
            "curtain", "closet", "shelf", "dresser", "desk", "armchair", "sofa", "chaise", "air conditioner", "fan",
            "heater", "stove", "refrigerator", "freezer", "oven", "microwave", "dishwasher", "washing machine", "dryer", "sink",
            "toilet", "sink", "shower", "bathtub", "bath", "kitchen sink", "trash", "broom", "vacuum", "mop",
            "bicycle", "skateboard", "scooter", "motorcycle", "bus", "tram", "subway", "bike", "truck", "car",
            "caravan", "trailer", "tow truck", "yacht", "sailboat", "ferry", "helicopter", "rocket", "satellite", "drone",
            "zapato", "camisa", "pantalón", "vestido", "reloj", "pulsera", "gafas", "sombrero", "cinturón", "bolsa",
            "periódico", "mapa", "teclado", "ratón", "teléfono", "ordenador", "anillo", "collar", "botella", "vaso",
            "taza", "plato", "tenedor", "cuchillo", "cuchara", "esponja", "toalla", "jabón", "champú", "peine",
            "cepillo", "cama", "colchón", "almohada", "manta", "sábana", "cuadro", "póster", "espejo", "foto",
            "cámara", "impresora", "radio", "televisión", "altavoz", "micrófono", "auriculares", "bombilla", "vela", "lámpara",
            "cortina", "armario", "estante", "cómoda", "escritorio", "sillón", "sofá", "tumbona", "aire acondicionado", "ventilador",
            "calefacción", "estufa", "nevera", "congelador", "horno", "microondas", "lavavajillas", "lavadora", "secadora", "fregadero",
            "inodoro", "lavabo", "ducha", "bañera", "baño", "fregadero de cocina", "basura", "escoba", "aspiradora", "fregona",
            "bicicleta", "monopatín", "patinete", "moto", "autobús", "tranvía", "metro", "bici", "camión", "coche",
            "caravana", "remolque", "grúa", "yate", "velero", "ferry", "helicóptero", "cohete", "satélite", "dron"
    };
    public static String[] englishWord={
            "gato",   "perro","computadora","coche","casa","libro","escuela","jardín","mesa","sol","luna","queso",
            "playa","montaña","río","árbol","flor","ciudad","pueblo","niño","niña","hombre","mujer","comer","beber",
            "vivir","amar","leer","escribir","correr","saltar","nadar","hablar","escuchar","ver","mirar","árbol",
            "flor","ciudad","pueblo","niño","niña","hombre","mujer","comer","beber","vivir","amar","leer","escribir",
            "correr","saltar","nadar","hablar","escuchar","ver","mirar","trabajar","jugar","dormir","pensar",
            "sentir","caminar","viajar","cantar","bailar","dibujar","pintar","cocinar","limpiar","enseñar",
            "aprender","comprar","vender","abrir","cerrar","empezar","terminar","ayudar","esperar","buscar","encontrar",
            "llamar","contar","reír","llorar","cielo","tierra","mar","fuego","agua","viento","tiempo","día","noche",
            "fruta","verdura","pan","carne","pescado","verdad","mentira","felicidad","tristeza","amor","odio","amigo",
            "enemigo","padre","madre","hermano","hermana","familia","guerra","paz","luz","oscuridad","calor",
            "frío","invierno","verano","primavera","otoño","vacaciones","trabajo","escuela","universidad","examen",
            "nota","clase","profesor","alumno","fiesta","cumpleaños","navidad","año","mes","semana","día","hora",
            "minuto","segundo","mañana","tarde","noche","ratón","elefante","pájaro","pez","tigre","león","serpiente",
            "caballo","vaca","oveja","lobo","zorro","oso","conejo","gallina","águila","canguro","cocodrilo","tiburón",
            "ballena","pulpo","medusa", "cocina", "vecino", "ventana", "puerta", "relámpago", "tormenta", "lluvia", "nieve", "silla", "lámpara",
            "bicicleta", "tren", "avión", "barco", "estación", "aeropuerto", "llave", "motor", "petróleo", "gasolina",
            "entrega", "paquete", "oficina", "tienda", "fábrica", "hospital", "iglesia", "museo", "cine", "teatro",
            "biblioteca", "barrio", "carretera", "camino", "calle", "parque", "jardín", "campo", "colina", "valle",
            "isla", "península", "costa", "golfo", "faro", "puente", "túnel", "torre", "ascensor", "escalera","zapato", "camisa", "pantalón", "vestido", "reloj", "pulsera", "gafas", "sombrero", "cinturón", "bolsa",
            "periódico", "mapa", "teclado", "ratón", "teléfono", "ordenador", "anillo", "collar", "botella", "vaso",
            "taza", "plato", "tenedor", "cuchillo", "cuchara", "esponja", "toalla", "jabón", "champú", "peine",
            "cepillo", "cama", "colchón", "almohada", "manta", "sábana", "cuadro", "póster", "espejo", "foto",
            "cámara", "impresora", "radio", "televisión", "altavoz", "micrófono", "auriculares", "bombilla", "vela", "lámpara",
            "cortina", "armario", "estante", "cómoda", "escritorio", "sillón", "sofá", "tumbona", "aire acondicionado", "ventilador",
            "calefacción", "estufa", "nevera", "congelador", "horno", "microondas", "lavavajillas", "lavadora", "secadora", "fregadero",
            "inodoro", "lavabo", "ducha", "bañera", "baño", "fregadero de cocina", "basura", "escoba", "aspiradora", "fregona",
            "bicicleta", "monopatín", "patinete", "moto", "autobús", "tranvía", "metro", "bici", "camión", "coche",
            "caravana", "remolque", "grúa", "yate", "velero", "ferry", "helicóptero", "cohete", "satélite", "dron"

    };

    private static ResourceBundle messages;

    public static void displayLife() {
        System.out.print(messages.getString("remaining_lives"));
        for (int i = 0; i < life; i++) System.out.print("♥");
        for (int i = 0; i < maxLife - life; i++) System.out.print("♡");
        System.out.println();
    }

    public static void clearTerminal() {
        try {
            if (System.getProperty("os.name").toLowerCase().contains("win")) {
                new ProcessBuilder("cmd", "/c", "cls").inheritIO().start().waitFor();
            } else {
                new ProcessBuilder("clear").inheritIO().start().waitFor();
            }
        } catch (IOException | InterruptedException e) {
            for (int i = 0; i < 100; i++) {
                System.out.println();
            }
        }
    }

    private static boolean correctEntry(String entry) {
        char[] chars = entry.toCharArray();
        for (char c : chars) {
            if (!Character.isLetter(c)) {
                return false;
            }
        }
        return true;
    }

    public static String getRamdomword(int langChoice) {
        return switch (langChoice) {
            case 1 -> frenchWord[(int) (Math.random() * frenchWord.length)];
            case 2 -> englishWord[(int) (Math.random() * englishWord.length)];
            case 3 -> espagnolWords[(int) (Math.random() * espagnolWords.length)];
            default -> "";
        };
    };
    public static void displayGuessedWord() {

        for (int i = 0; i < sansAccentwordToFind.length(); i++) {
            if (guessedWord.charAt(i) == '_') {
                System.out.print("_ ");
            } else {
                System.out.print(sansAccentwordToFind.charAt(i) + " "); // Affiche le mot original avec accents
            }
        }
        System.out.println();
    }
    // https://www.w3schools.com/java/ref_string_replace.asp
    public static String removeAccents(String input) {
        return input.replace('â', 'a')
                .replace('é', 'e')
                .replace('è', 'e')
                .replace('ê', 'e')
                .replace('î', 'i')
                .replace('ô', 'o')
                .replace('ö', 'o')
                .replace('ñ', 'n');
    }
    public static boolean correctLanguage(String language){
        String[] correctAnswer ={"1","2","3","anglais", "espagnol","francais","français","es","fr","an","en"};
        for (String s : correctAnswer) {
            if (language.equals(s)) {
                return true;
            }
        }
        return false;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        // Choix de la langue
        do {
            System.out.println("Choisissez votre langue : 1 - Français, 2 - Anglais, 3 - Espagnol");
            System.out.print(">>>");
            language = sc.nextLine().toLowerCase();
        } while (!correctLanguage(language));

        // Définir la langue en fonction du choix
        int langChoice;
        try {
            langChoice = Integer.parseInt(language);
        } catch (NumberFormatException e) {
            langChoice = switch (language) {
                case "anglais", "en", "an" -> 2;
                case "espagnol", "es" -> 3;
                default -> 1;
            };
        }

        switch (langChoice) {
            case 1:
                messages = ResourceBundle.getBundle("ressources/message", Locale.forLanguageTag("fr"));
                break;
            case 2:
                messages = ResourceBundle.getBundle("ressources/message", Locale.forLanguageTag("en"));
                break;
            case 3:
                messages = ResourceBundle.getBundle("ressources/message", Locale.forLanguageTag("es"));
                break;
        }

        // Saisie du mot à deviner
        do {
            System.out.println(messages.getString("enter_word"));
            System.out.print(">>>");
            sansAccentwordToFind = sc.nextLine(); // Récupérer le mot original
            if (sansAccentwordToFind.equals("1")){
                sansAccentwordToFind=getRamdomword(langChoice);
                break;
            }
        } while (!correctEntry(sansAccentwordToFind));


        // Normalisation du mot à deviner
        wordToFind = removeAccents(sansAccentwordToFind.toLowerCase()); // Normaliser le mot pour la logique

        guessedWord = new StringBuilder("_".repeat(wordToFind.length()));
        guessedWord.setCharAt(0, wordToFind.charAt(0));

        while (life > 0) {
            clearTerminal();
            displayLife();
            displayGuessedWord();

            System.out.println(messages.getString("enter_letter"));
            System.out.print(">>>");
            String userInput = sc.nextLine().toLowerCase();


            userInput = removeAccents(userInput).toLowerCase();

            if (userInput.length() != 1 || !correctEntry(userInput)) {

                if (userInput.equals("see")) {
                    if (letterAlreadyUsed.isEmpty()) {
                        System.out.println(messages.getString("no_letters_used"));
                    } else {
                        System.out.println(messages.getString("allLetters"));
                        System.out.println(letterAlreadyUsed);
                    }
                    System.out.println(messages.getString("enter_letter"));
                    System.out.print(">>>");
                    userInput = sc.nextLine().toLowerCase();
                }
                else{
                System.out.println(messages.getString("invalid_input"));
                continue;}
            }

            letterAlreadyUsed.add(userInput.charAt(0));

            if (wordToFind.contains(userInput)) {
                for (int i = 0; i < wordToFind.length(); i++) {
                    if (wordToFind.charAt(i) == userInput.charAt(0)) {
                        guessedWord.setCharAt(i, userInput.charAt(0));
                    }
                }
            } else {
                life--;
                System.out.println(messages.getString("incorrect_letter"));
            }

            if (guessedWord.toString().equals(wordToFind)) {
                System.out.println(messages.getString("win_message"));
                break;
            }
        }

        if (life <= 0) {
            System.out.println(messages.getString("lose_message") +" "+ sansAccentwordToFind); // Afficher le mot original
        }

        sc.close();
    }

}
