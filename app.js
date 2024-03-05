const express = require('express');
const app = express();
const models = require('./models');
// Middleware untuk mengurai body permintaan menjadi objek JSON
app.use(express.json());
// Gunakan setiap router dari model yang diimpor
for (let modelName in models) {
    app.use(models[modelName]);
  }
const port = 3000;

const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  };

app.use(jsonMiddleware);

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
