import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;

public class Main3 {
    private String[][] grid = new String[20000][20000];
    private int x = 10000;
    private int y = 10000;
    private int minDistance;
    int stepsWire;
    ArrayList<Integer> intersections = new ArrayList<>();

    private void move(String instruction, int wire) {
        int amount = Integer.parseInt(instruction.substring(1));
        while (amount != 0) {
            switch (instruction.charAt(0)) {
                case 'R':
                    x++;
                    break;
                case 'L':
                    x--;
                    break;
                case 'U':
                    y++;
                    break;
                case 'D':
                    y--;
                    break;
            }
            if (wire == 1) {
                grid[x][y] = "1" + ++stepsWire;
            } else if (grid[x][y] == null || grid[x][y].charAt(0) == '2') {
                grid[x][y] = "2" + ++stepsWire;
            } else if (grid[x][y].charAt(0) == ('1')) {
                stepsWire++;
                String stepsWire1 = grid[x][y].substring(1);
                intersections.add(Integer.parseInt(stepsWire1) + stepsWire);
            }
            amount--;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader in1 = new BufferedReader(new FileReader("/Users/rene/Workspace/WPI/SoftwareEngineering/AdventOfCode/3/input1.txt"));
        String[] wire1 = in1.readLine().split(",");
        BufferedReader in2 = new BufferedReader(new FileReader("/Users/rene/Workspace/WPI/SoftwareEngineering/AdventOfCode/3/input2.txt"));
        String[] wire2 = in2.readLine().split(",");
        Main3 ob = new Main3();
        for (String s : wire1) {
            ob.move(s, 1);
        }
        ob.x = 10000;
        ob.y = 10000;
        ob.stepsWire = 0;
        for (String s : wire2) {
            ob.move(s, 2);
        }
        int i = ob.intersections.indexOf(Collections.min(ob.intersections));
        System.out.println(ob.intersections.get(i));
    }
}
