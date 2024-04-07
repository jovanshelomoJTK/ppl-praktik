
import { add, subtract, multiply, divide } from './operations.js'

export function calculate(a, b, operator) {
    a = parseInt(a);
    b = parseInt(b);
    if (isNaN(a) || isNaN(b)) {
        throw new Error("Variable a atau b bukan angka!");
    }
    if (a < -32768 || a > 32767 || b < -32768 || b > 32767) {
        throw new Error("Variable diluar range!");
    }

    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            throw new Error("Operator Salah! (Harus +, -, *, /)");
    }
}