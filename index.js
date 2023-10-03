const express = require('express')
const app = express()
const port = 4000

app.get('/', (req, res) => {
    res.send('halo dek')
})

const bodyPs = require('body-parser');
app.use(bodyPs.urlencoded({ extended: false}));
app.use(bodyPs.json());

const kat_menu = require("./routes/kategori_menu.js");
app.use("/api/kategori_menu", kat_menu);

const pengelola = require("./routes/pengelola_restorant.js");
app.use("/api/pengelola", pengelola);

const menu = require("./routes/menu.js");
app.use("/api/menu", menu);

const pelanggan = require("./routes/pelanggan.js");
app.use("/api/pelanggan", pelanggan);

const pesanan = require("./routes/pesanan.js");
app.use("/api/pesanan", pesanan);

const pembayaran = require("./routes/pembayaran.js");
app.use("/api/pembayaran", pembayaran);

const pengiriman = require("./routes/pengiriman.js");
app.use("/api/pengiriman", pengiriman);

app.listen(port, () => {
    console.log(`aplikasi berjalan di http:://localhost:${port}`)
})