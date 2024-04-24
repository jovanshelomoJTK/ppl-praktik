# Program Kalkulator untuk Pengujian Perangkat Lunak

## Deskripsi

Program kalkulator yang dapat melakukan operasi penjumlahan, pengurangan, perkalian, dan pembagian. Program ini dibuat untuk memenuhi tugas mata kuliah Pengujian Perangkat Lunak.

Fitur:

- Penjumlahan
- Pengurangan
- Perkalian
- Pembagian

Batasan:

- Operasi-operasi yang dapat dilakukan: +, -, \*, /
- Input hanya menerima angka dengan range dari -32768 hingga 32767 (inklusif).
- Operasi pembagian tidak dapat menerima input 0 sebagai pembagi.

## Anggota Kelompok

- Jovan Shelomo (@jovanshelomoJTK)
- Rahma Alia Latifa (@erhaemael)
- Mey Meizia Galtiady (@meymeiziagaltiady)

## Struktur Folder

```
kalkulator
 ┣ html <-- hasil generate test report
 ┣ node_modules
 ┣ src <-- source code
 ┃ ┣ calculate.js
 ┃ ┣ main.js
 ┃ ┗ operations.js
 ┣ test <-- testing dilakukan pada folder ini
 ┃ ┣ calculate.test.js
 ┃ ┣ main.test.js
 ┃ ┗ operations.test.js
 ┣ .gitignore
 ┣ index.js
 ┣ package-lock.json
 ┣ package.json
 ┣ README.md
 ┣ test-results.json <-- hasil generate test report
 ┣ test-results.xml <-- hasil generate test report
 ┗ vitest.config.js
```

Untuk menambah test case, dapat dilakukan pada file-file di dalam folder `test`.

## Prerequisites

- Node.js 16+

## Cara Penggunaan

1. Ketikkan perintah berikut pada terminal:

   ```bash
   npm i
   npm start
   ```

2. Masukkan angka pertama yang diinginkan, kemudian tekan `Enter`.
3. Masukkan angka kedua yang diinginkan, kemudian tekan `Enter`.
4. Pilih operasi yang diinginkan, kemudian tekan `Enter`.
5. Hasil operasi atau error akan ditampilkan pada layar.

## Pengujian (Menggunakan Vitest)

1. Untuk melakukan pengujian, jalankan perintah berikut pada terminal:

   ```bash
   npm i # jika belum dilakukan
   npm test
   ```

2. Setelah dijalankan, akan terbentuk beberapa jenis test report:

   1. Test report + coverage html: dapat dibuka pada `localhost:4173` (harus menjalankan `npm test` terlebih dahulu karena bersifat interaktif)
   2. Test coverage sendiri dapat dilihat pada `html/coverage/index.html` (dapat langsung dibuka tanpa server)
   3. Test report dalam bentuk file json dan JUnit:
      - pada file `test-results.json` (JSON format)
      - pada file `test-results.xml` (JUnit format)

3. Jika hanya ingin menjalankan server untuk test result, dapat menggunakan perintah berikut, dan buka `localhost:4173` pada browser

   ```bash
   npx vite preview --outDir html
   ```

4. Untuk informasi lebih lengkap mengenai vitest, dapat dilihat pada https://vitest.dev/

## Penjelasan test case yang sudah dibuat

### File main.test.js

```javascript
import { main } from "../src/main.js";
import { describe, expect, it, vi, afterEach, beforeEach } from "vitest";
import { calculate } from "../src/calculate.js";

// membuat mock untuk file calculate.js
vi.mock("../src/calculate.js", () => ({
  calculate: vi.fn(),
}));

// fungsi untuk menuliskan input pada stdin secara otomatis untuk kebutuhan testing
function initiateStdin(inputs) {
  vi.spyOn(process.stdin, "iterator").mockImplementation(() => {
    const next = vi.fn();
    inputs.forEach((input) => {
      next.mockReturnValueOnce({ value: input });
    });
    return { next };
  });
}

// group test untuk module main
describe("Test main function", () => {
  let mockStdout = null;

  // dijalankan sebelum setiap test, berguna untuk membuat mock
  beforeEach(() => {
    mockStdout = vi
      .spyOn(process.stdout, "write")
      .mockImplementation(() => true);
  });

  // dijalankan setelah setiap test, berguna untuk mereset mock
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // test case
  it("Calculate tidak menghasilkan error", async () => {
    const inputs = ["5", "4", "+"]; // input yang akan dimasukkan
    const output = 9; // output yang diharapkan

    initiateStdin(inputs); // me-mock input stdin
    calculate.mockReturnValueOnce(output); // membuat mock untuk calculate, sehingga ketika fungsi calculate dipanggil, akan mengembalikan nilai output

    await main(); // menjalankan fungsi main dengan input yang telah di "queue" pada std in sehingga tidak perlu memasukkan input secara manual

    expect(mockStdout).toHaveBeenNthCalledWith(1, "Masukkan angka pertama: "); // memastikan output sesuai dengan urutan dan konten yang diharapkan
    expect(mockStdout).toHaveBeenNthCalledWith(2, "Masukkan angka kedua: "); // memastikan output sesuai dengan urutan dan konten yang diharapkan

    // memastikan output yang diharapkan sesuai dengan yang diharapkan
    expect(mockStdout).toHaveBeenNthCalledWith(
      3,
      "Masukkan operator (+, -, *, /): "
    );
    expect(calculate).toHaveBeenCalledWith(...inputs); // memastikan fungsi calculate dipanggil dengan parameter yang sesuai
    expect(mockStdout).toHaveBeenNthCalledWith(4, "hasil: " + output + "\n"); // memastikan output sesuai dengan urutan dan konten yang diharapkan
  });

  // test case
  it("Calculate menghasilkan error", async () => {
    const inputs = ["5", "0", "/"]; // input yang akan dimasukkan
    const output = "Tidak bisa membagi dengan 0!"; // output yang diharapkan

    initiateStdin(inputs); // me-mock input stdin

    // membuat mock untuk calculate, sehingga ketika fungsi calculate dipanggil, akan melemparkan error
    calculate.mockImplementation(() => {
      throw new Error(output);
    });

    await main(); // menjalankan fungsi main dengan input yang telah di "queue" pada std in sehingga tidak perlu memasukkan input secara manual

    expect(mockStdout).toHaveBeenNthCalledWith(1, "Masukkan angka pertama: "); // memastikan output sesuai dengan urutan dan konten yang diharapkan
    expect(mockStdout).toHaveBeenNthCalledWith(2, "Masukkan angka kedua: "); // memastikan output sesuai dengan urutan dan konten yang diharapkan
    expect(mockStdout).toHaveBeenNthCalledWith(
      3,
      "Masukkan operator (+, -, *, /): "
    ); // memastikan output sesuai dengan urutan dan konten yang diharapkan
    expect(calculate).toHaveBeenCalledWith(...inputs); // memastikan fungsi calculate dipanggil dengan parameter yang sesuai
    expect(mockStdout).toHaveBeenNthCalledWith(4, output + "\n"); // memastikan output sesuai dengan urutan dan konten yang diharapkan
  });
});
```

### File calculate.test.js

```javascript
import { calculate } from "../src/calculate.js";
import { describe, expect, it, vi, afterEach } from "vitest";
import { add, subtract, multiply, divide } from "../src/operations.js";

// membuat mock untuk file operations.js
vi.mock("../src/operations.js", () => ({
  add: vi.fn(),
  subtract: vi.fn(),
  multiply: vi.fn(),
  divide: vi.fn(),
}));

// fungsi untuk mengecek apakah string sama persis
function regexExactString(string) {
  return new RegExp(
    "^" +
      string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d") +
      "$"
  );
}

// group test untuk module calculate
describe("Test calculate function", () => {
  // dijalankan setelah setiap test, berguna untuk mereset mock
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // test case
  it("Operasi pertambahan 2 angka", () => {
    add.mockReturnValueOnce(3); // membuat mock untuk add, sehingga ketika fungsi add dipanggil, akan mengembalikan nilai 3

    expect(calculate(1, 2, "+")).toBe(3); // memanggil fungsi calculate dengan parameter 1, 2, dan "+", dan memastikan hasilnya adalah 3
    expect(add).toHaveBeenCalledWith(1, 2); // memastikan fungsi add dipanggil dengan parameter 1 dan 2
  });

  // test case
  it("Operasi pengurangan 2 angka", () => {
    subtract.mockReturnValueOnce(1); // membuat mock untuk subtract, sehingga ketika fungsi subtract dipanggil, akan mengembalikan nilai 1

    expect(calculate(2, 1, "-")).toBe(1); // memanggil fungsi calculate dengan parameter 2, 1, dan "-", dan memastikan hasilnya adalah 1
    expect(subtract).toHaveBeenCalledWith(2, 1); // memastikan fungsi subtract dipanggil dengan parameter 2 dan 1
  });

  // test case
  it("Operasi perkalian 2 angka", () => {
    multiply.mockReturnValueOnce(6); // membuat mock untuk multiply, sehingga ketika fungsi multiply dipanggil, akan mengembalikan nilai 6

    expect(calculate(2, 3, "*")).toBe(6); // memanggil fungsi calculate dengan parameter 2, 3, dan "*", dan memastikan hasilnya adalah 6
    expect(multiply).toHaveBeenCalledWith(2, 3); // memastikan fungsi multiply dipanggil dengan parameter 2 dan 3
  });

  // test case
  it("Operasi pembagian 2 angka", () => {
    divide.mockReturnValueOnce(3); // membuat mock untuk divide, sehingga ketika fungsi divide dipanggil, akan mengembalikan nilai 3

    expect(calculate(6, 2, "/")).toBe(3); // memanggil fungsi calculate dengan parameter 6, 2, dan "/", dan memastikan hasilnya adalah 3
    expect(divide).toHaveBeenCalledWith(6, 2); // memastikan fungsi divide dipanggil dengan parameter 6 dan 2
  });

  // test case
  it("Operator salah", () => {
    // memastikan fungsi calculate melemparkan error dengan pesan yang sesuai jika operator yang dimasukkan salah
    expect(() => {
      calculate(123, 456, "a");
    }).toThrowError(regexExactString("Operator Salah! (Harus +, -, *, /)"));
  });

  // test case
  it("Operand bukan angka", () => {
    // memastikan fungsi calculate melemparkan error dengan pesan yang sesuai jika salah satu operand bukan angka
    expect(() => {
      calculate(123, "a", "+");
    }).toThrowError(regexExactString("Variable a atau b bukan angka!"));
  });

  // test case
  it("Operand yang dimasukan melebihi range", () => {
    // memastikan fungsi calculate melemparkan error dengan pesan yang sesuai jika salah satu operand melebihi range
    expect(() => {
      calculate(32768, -1, "+");
    }).toThrowError(regexExactString("Variable diluar range!"));
  });
});
```

### operations.test.js

```javascript
import { add, divide, multiply, subtract } from "../src/operations.js";
import { describe, expect, it } from "vitest";

// group test untuk module add
describe("Test add function", () => {
  // test case
  it("Operasi penambahan 2 angka", () => {
    expect(add(1, 2)).toBe(3); // memastikan hasil penambahan 1 dan 2 adalah 3
  });
});

// group test untuk module subtract
describe("Test subtract function", () => {
  // test case
  it("Operasi pengurangan 2 angka", () => {
    expect(subtract(2, 1)).toBe(1); // memastikan hasil pengurangan 2 dan 1 adalah 1
  });
});

// group test untuk module multiply
describe("Test multiply function", () => {
  // test case
  it("Operasi perkalian 2 angka", () => {
    expect(multiply(2, 3)).toBe(6); // memastikan hasil perkalian 2 dan 3 adalah 6
  });
});

// group test untuk module divide
describe("Test divide function", () => {
  // test case
  it("Operasi pembagian 2 angka", () => {
    expect(divide(6, 2)).toBe(3); // memastikan hasil pembagian 6 dan 2 adalah 3
  });

  // test case
  it("Operasi pembagian dengan penyebut nol", () => {
    expect(() => {
      divide(6, 0);
    }).toThrowError("Tidak bisa membagi dengan 0!"); // memastikan fungsi divide melemparkan error dengan pesan yang sesuai jika penyebut adalah 0
  });
});
```
