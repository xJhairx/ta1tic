const express = require("express");

const app = express();
app.use(express.json());

const catalog = [
  { id: 1, title: "Andes: la ruta del sur", genre: "documental", durationMin: 52 },
  { id: 2, title: "Noches de Lima", genre: "serie", durationMin: 40 },
  { id: 3, title: "El ultimo tren", genre: "pelicula", durationMin: 118 },
];

// En un entorno real, cada despliegue invalidaria las URLs cacheadas
// en el CDN correspondientes al catalogo actualizado.
function invalidateCdnCache(paths) {
  return { invalidated: paths, requestId: `cdn-inv-${Date.now()}` };
}

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "streamperu-backend" });
});

app.get("/catalog", (req, res) => {
  res.status(200).json(catalog);
});

app.get("/catalog/:id", (req, res) => {
  const item = catalog.find((c) => c.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: "Titulo no encontrado" });
  res.status(200).json(item);
});

// Endpoint que el paso de despliegue del pipeline podria invocar
// (simulado) despues de publicar una nueva version del catalogo.
app.post("/internal/cache/invalidate", (req, res) => {
  const paths = req.body.paths || ["/catalog"];
  res.status(200).json(invalidateCdnCache(paths));
});

module.exports = { app, invalidateCdnCache };

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`StreamPeru backend escuchando en :${PORT}`));
}
