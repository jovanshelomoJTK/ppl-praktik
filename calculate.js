
import { add, subtract, multiply, divide } from './operations.js'

export function calculate(a, b, operator) {
    if (typeof a !== "number" || typeof b !== "number") {
        return "Variable bukan angka!"
    }
    if (a < 32768 || a > 32767 || b < 32768 || b > 32767) {
        return "Variable diluar range!"
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
            return "Operator Salah! (Harus +, -, *, /)"
    }
}