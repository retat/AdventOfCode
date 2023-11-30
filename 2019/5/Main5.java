import java.util.Scanner;

public class Main5 {
    private int[] program = new int[]{3,225,1,225,6,6,1100,1,238,225,104,0,1101,78,5,225,1,166,139,224,101,-74,224,224,4,224,1002,223,8,223,1001,224,6,224,1,223,224,223,1002,136,18,224,101,-918,224,224,4,224,1002,223,8,223,101,2,224,224,1,224,223,223,1001,83,84,224,1001,224,-139,224,4,224,102,8,223,223,101,3,224,224,1,224,223,223,1102,55,20,225,1101,53,94,225,2,217,87,224,1001,224,-2120,224,4,224,1002,223,8,223,1001,224,1,224,1,224,223,223,102,37,14,224,101,-185,224,224,4,224,1002,223,8,223,1001,224,1,224,1,224,223,223,1101,8,51,225,1102,46,15,225,1102,88,87,224,1001,224,-7656,224,4,224,102,8,223,223,101,7,224,224,1,223,224,223,1101,29,28,225,1101,58,43,224,1001,224,-101,224,4,224,1002,223,8,223,1001,224,6,224,1,224,223,223,1101,93,54,225,101,40,191,224,1001,224,-133,224,4,224,102,8,223,223,101,3,224,224,1,223,224,223,1101,40,79,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1008,226,677,224,1002,223,2,223,1005,224,329,1001,223,1,223,1107,226,677,224,1002,223,2,223,1005,224,344,1001,223,1,223,8,677,226,224,1002,223,2,223,1006,224,359,1001,223,1,223,1108,226,677,224,1002,223,2,223,1006,224,374,101,1,223,223,1007,677,677,224,102,2,223,223,1006,224,389,1001,223,1,223,8,226,677,224,102,2,223,223,1006,224,404,101,1,223,223,1007,226,226,224,1002,223,2,223,1006,224,419,101,1,223,223,107,677,226,224,1002,223,2,223,1006,224,434,1001,223,1,223,1007,226,677,224,102,2,223,223,1005,224,449,101,1,223,223,1107,226,226,224,1002,223,2,223,1005,224,464,1001,223,1,223,107,226,226,224,102,2,223,223,1006,224,479,101,1,223,223,108,226,226,224,1002,223,2,223,1006,224,494,101,1,223,223,107,677,677,224,102,2,223,223,1005,224,509,1001,223,1,223,1008,677,677,224,1002,223,2,223,1006,224,524,101,1,223,223,1107,677,226,224,102,2,223,223,1006,224,539,1001,223,1,223,108,677,226,224,102,2,223,223,1006,224,554,1001,223,1,223,1108,677,226,224,102,2,223,223,1005,224,569,1001,223,1,223,8,677,677,224,1002,223,2,223,1005,224,584,1001,223,1,223,7,677,677,224,1002,223,2,223,1005,224,599,101,1,223,223,1108,226,226,224,102,2,223,223,1006,224,614,101,1,223,223,1008,226,226,224,1002,223,2,223,1005,224,629,101,1,223,223,7,677,226,224,102,2,223,223,1006,224,644,1001,223,1,223,7,226,677,224,102,2,223,223,1005,224,659,101,1,223,223,108,677,677,224,1002,223,2,223,1006,224,674,101,1,223,223,4,223,99,226};

    private int run() {
        int instructionPointer = 0;
        String instruction = String.valueOf(program[instructionPointer]);
        int opcode = instruction.length() > 1 ? Integer.parseInt(instruction.substring(instruction.length() - 2)) : Integer.parseInt(instruction);
        while (opcode != 99) {
            int mode1 = instruction.length() > 2 ? Character.getNumericValue(instruction.charAt(instruction.length() - 3)) : 0;
            int mode2 = instruction.length() > 3 ? Character.getNumericValue(instruction.charAt(instruction.length() - 4)) : 0;
            int nextInstruction = 4;
            switch (opcode) {
                case 1:
                    add(mode1 == 0 ? program[program[instructionPointer + 1]] : program[instructionPointer + 1],
                            mode2 == 0 ? program[program[instructionPointer + 2]] : program[instructionPointer + 2],
                            program[instructionPointer + 3]);
                    break;
                case 2:
                    multiply(mode1 == 0 ? program[program[instructionPointer + 1]] : program[instructionPointer + 1],
                            mode2 == 0 ? program[program[instructionPointer + 2]] : program[instructionPointer + 2],
                            program[instructionPointer + 3]);
                    break;
                case 3:
                    getInput(program[instructionPointer + 1]);
                    nextInstruction = 2;
                    break;
                case 4:
                    getOutput(mode1 == 0 ? program[instructionPointer + 1] : instructionPointer + 1);
                    nextInstruction = 2;
                    break;
                case 5:
                    if ((mode1 == 0 ? program[program[instructionPointer + 1]] : program[instructionPointer + 1]) != 0) {
                        nextInstruction = 0;
                        instructionPointer = (mode2 == 0 ? program[program[instructionPointer + 2]] : program[instructionPointer + 2]);
                    } else {
                        nextInstruction = 3;
                    }
                    break;
                case 6:
                    if ((mode1 == 0 ? program[program[instructionPointer + 1]] : program[instructionPointer + 1]) == 0) {
                        nextInstruction = 0;
                        instructionPointer = (mode2 == 0 ? program[program[instructionPointer + 2]] : program[instructionPointer + 2]);
                    }else {
                        nextInstruction = 3;
                    }
                    break;
                case 7:
                    if ((mode1 == 0 ? program[program[instructionPointer + 1]] : program[instructionPointer + 1]) <
                            (mode2 == 0 ? program[program[instructionPointer + 2]] : program[instructionPointer + 2])) {
                        program[program[instructionPointer + 3]] = 1;
                    } else {
                        program[program[instructionPointer + 3]] = 0;
                    }
                    break;
                case 8:
                    if ((mode1 == 0 ? program[program[instructionPointer + 1]] : program[instructionPointer + 1]) ==
                            (mode2 == 0 ? program[program[instructionPointer + 2]] : program[instructionPointer + 2])) {
                        program[program[instructionPointer + 3]] = 1;
                    } else {
                        program[program[instructionPointer + 3]] = 0;
                    }
                    break;
            }
            instructionPointer += nextInstruction;
            instruction = String.valueOf(program[instructionPointer]);
            opcode = instruction.length() > 1 ? Integer.parseInt(instruction.substring(instruction.length() - 2)) : Integer.parseInt(instruction);
        }
        return program[0];
    }

    private void getOutput(int position) {
        System.out.println(program[position]);
    }

    private void getInput(int position) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Input: ");
        program[position] = Integer.parseInt(sc.next());
    }

    private void add(int num1, int num2, int position) {
        program[position] = num1 + num2;
    }

    public void multiply(int num1, int num2, int position) {
        program[position] = num1 * num2;
    }

    public static void main(String[] args) {
        new Main5().run();
    }

}
