import "dotenv/config"
import express from "express";
import cors from "cors";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);


console.log('Starting server ENV PORT =', process.env.PORT);

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/ping", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('devices')
      .select('*')
      .limit(1);

    if (error) throw error;
    res.json({ success: true, message: "Database connected!", data });
  } catch (error) {
    res.status(500).json({ error: "Database connection failed", details: error.message });
  }
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
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

app.get("/api/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie details", detail: error.message });
  }
});

app.get("/api/watchlist/:deviceId", async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { data, error } = await supabase.from("watchlist").
      select("*, movies(movie_id, title, poster_url, release_date, rating)").eq("device_id", deviceId).order("added_at", { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch watchlist", detail: error.message });
  }
});


app.post("/api/watchlist", async (req, res) => {
  try {
    const { device_id, movie } = req.body;
    const { data: device, error: deviceError } = await supabase.from("devices").upsert({ device_id }, { onConflict: "device_id" }).select();
    if (deviceError) throw deviceError;

    const { data: movieData, error: movieError } = await supabase.from("movies")
      .upsert({
        movie_id: movie.id,
        title: movie.title,
        poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
        release_date: movie.release_date,
        rating: movie.vote_average,
      }, { onConflict: 'movie_id' }).select();

    if (movieError) throw movieError;

    const { data: watchListData, error: watchListError } = await supabase.from("watchlist").insert({ device_id, movie_id: movie.id }).select();

    if (watchListError) throw watchListError;

    res.json({ success: true, data: watchListData });
  } catch (error) {
    if (error.code === "23505") {
      res.status(400).json({ error: "Movie already in watchlist" });
    } else {
      res.status(500).json({ error: "Failed to add movie to watchlist", detail: error.message });
    }
  }
});

app.delete("/api/watchlist/:deviceId/:movieId", async (req, res) => {
  try{
    const {deviceId, movieId} = req.params;

    const {error} = await supabase.from("watchlist").delete().eq("device_id", deviceId).eq("movie_id", movieId);

    if(error) throw error;
    
    res.json({success: true});
  } catch(error){
    res.status(500).json({ error: "Failed to remove movie from watchlist", detail: error.message });
  }
});


app.listen(PORT, () =>
  console.log(`API running at http://localhost:${PORT}`)
);