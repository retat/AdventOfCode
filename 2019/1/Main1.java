import java.io.*;
public class Main1 {
    public static void main(String[] args) throws IOException {
        File file = new File("/Users/rene/Workspace/WPI/SoftwareEngineering/AdventOfCode/src/1/input1.txt");
        BufferedReader br = new BufferedReader(new FileReader(file));
        String input;
        int totalFuel = 0;
        while ((input = br.readLine()) != null) {
            int moduleFuel = (int) Math.floor(Integer.parseInt(input) / 3) - 2;
            while (moduleFuel >= 0) {
                totalFuel += moduleFuel;
                moduleFuel = (moduleFuel / 3) - 2;
            }
        }
        System.out.println(totalFuel);
    }
}
