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
- Operasi pembagian tidak dapat menerima input 0.

## Anggota Kelompok

- Jovan Shelomo (@jovanshelomoJTK)
- Rahma Alia Latifa (@erhaemael)
- Mey Meizia Galtiady (@meymeiziagaltiady)

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
