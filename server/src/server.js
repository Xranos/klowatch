import express from "express";
import { readFile } from "fs/promises";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.json({ ok: true, service: "klowatch-api", time: new Date().toISOString() });
});

app.get("/api/search", async (req, res)=>{
  const q = (req.query.q || "").toString().trim().toLowerCase();
  const fileUrl = new URL("./data/items.json", import.meta.url);
  const items = JSON.parse(await readFile(fileUrl, "utf-8"));

  const results = q
    ? items.filter(it =>
      [it.name, it.brand, ...(it.tags || [])].join(" ").toLowerCase().includes(q)
    ) : items;

  res.json({count:results.length, items: results});
});

app.use("/api", (_req, res) => res.status(404).json({error: "not found"}));

app.listen(PORT, () =>{ console.log(`API listening on http://localhost:${PORT}`)});