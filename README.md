# RUN

```bash
npm i
npm start
```

# TEST (Vitest)

```bash
npm test
```

Akan terbentuk 3 test report:

1.  Test report + coverage html: dapat dibuka pada `localhost:4173` (harus menjalankan `npm test` terlebih dahulu)
2.  Test coverage sendiri dapat dilihat pada `html/coverage/index.html` (dapat langsung dibuka tanpa server)
3.  Test report file json dan JUnit:
    - pada file `test-results.json`
    - pada file `test-results.xml` (JUnit format)
