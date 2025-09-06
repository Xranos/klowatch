import "dotenv/config"
import express from "express";
import cors from "cors";

console.log('Starting server ENV PORT =', process.env.PORT);

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());


app.get("/api/ping", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

app.get("/api/movies/popular", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});


app.listen(PORT, () =>
  console.log(`API running at http://localhost:${PORT}`)
);