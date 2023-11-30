public class Main2 {
    private int[] program = new int[]{1, 0, 0, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 1, 10, 19, 1, 9, 19, 23, 1, 13, 23, 27, 1, 5, 27, 31, 2, 31, 6, 35, 1, 35, 5, 39, 1, 9, 39, 43, 1, 43, 5, 47, 1, 47, 5, 51, 2, 10, 51, 55, 1, 5, 55, 59, 1, 59, 5, 63, 2, 63, 9, 67, 1, 67, 5, 71, 2, 9, 71, 75, 1, 75, 5, 79, 1, 10, 79, 83, 1, 83, 10, 87, 1, 10, 87, 91, 1, 6, 91, 95, 2, 95, 6, 99, 2, 99, 9, 103, 1, 103, 6, 107, 1, 13, 107, 111, 1, 13, 111, 115, 2, 115, 9, 119, 1, 119, 6, 123, 2, 9, 123, 127, 1, 127, 5, 131, 1, 131, 5, 135, 1, 135, 5, 139, 2, 10, 139, 143, 2, 143, 10, 147, 1, 147, 5, 151, 1, 151, 2, 155, 1, 155, 13, 0, 99, 2, 14, 0, 0};

    private int run(int noun, int verb) {
        program[1] = noun;
        program[2] = verb;
        int instructionPointer = 0;
        int opcode = program[instructionPointer];
        while (opcode != 99) {
            int positionOp1 = program[instructionPointer + 1];
            int positionOp2 = program[instructionPointer + 2];
            int positionResult = program[instructionPointer + 3];
            switch (opcode) {
                case 1:
                    add(program[positionOp1], program[positionOp2], positionResult);
                    break;
                case 2:
                    multiply(program[positionOp1], program[positionOp2], positionResult);
                    break;
            }
            instructionPointer += 4;
            opcode = program[instructionPointer];
        }
        return program[0];
    }

    private void add(int num1, int num2, int position) {
        program[position] = num1 + num2;
    }

    public void multiply(int num1, int num2, int position) {
        program[position] = num1 * num2;
    }

    public static void main(String[] args) {
        for (int noun = 0; noun < 100; noun++) {
            for (int verb = 0; verb < 100; verb++) {
                if (new Main2().run(noun, verb) == 19690720) {
                    System.out.println("found solution with " + noun + " and " + verb);
                }
            }
        }
    }

}
