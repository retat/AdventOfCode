import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.util.regex.Pattern.CASE_INSENSITIVE;

public class Main4 {
    private int value = 193651;
    private int end = 649279;

    private boolean doubleDigit() {
        String line = String.valueOf(value);
        String pattern = "(\\d)(?!\\1)(\\d)\\2(?!\\2)|^((\\d)\\4(?!\\4))";
        Pattern regcomp = Pattern.compile(pattern, CASE_INSENSITIVE);
        Matcher regexec = regcomp.matcher(line);
        return regexec.find();
    }

    private boolean digitsIncrease() {
        String value = String.valueOf(this.value);
        int current = 0;
        for (int i = 0; i < 6; i++) {
            if (Character.getNumericValue(value.charAt(i)) >= current) {
                current = Character.getNumericValue(value.charAt(i));
            } else {
                return false;
            }
        }
        return true;
    }

    private int run() {
        int count = 0;
        while (value != end) {
            if (doubleDigit() && digitsIncrease()) {
                count++;
            }
            value++;
        }
        return count;
    }

    public static void main(String[] args) {
        Main4 main = new Main4();
        System.out.println(main.run());
    }
}
