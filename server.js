const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// 🔑 TU API KEY DE PIXABAY
const API_KEY = "41023169-4ecf3a9fabae7d25d2fe6cb69"

// 💰 LINK DE VENTA
const LINK_VENTA = "https://tulink.com";

app.post("/generar", async (req, res) => {
  const { nicho } = req.body;

  try {
    const url = `https://pixabay.com/api/videos/?key=${API_KEY}&q=${nicho}&per_page=5`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.hits || data.hits.length === 0) {
      return res.json({
        mensaje: "No se encontraron videos",
        videos: []
      });
    }

    const videos = data.hits.map(v => {
      return v.videos.medium.url;
    });

    res.json({
      mensaje: `Videos encontrados sobre ${nicho}`,
      videos,
      link: LINK_VENTA
    });

  } catch (err) {
    res.status(500).json({ error: "Error en servidor" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🔥 Generador 2 activo"));
