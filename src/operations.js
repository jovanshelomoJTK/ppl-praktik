export function add(a, b) {
    return a + b
}

export function subtract(a, b) {
    return a - b
}

export function multiply(a, b) {
    return a * b
}

export function divide(a, b) {
    if (b === 0) { // jika penyebut = 0
        throw new Error("Tidak bisa membagi dengan 0!")
    }
    return a / b
}