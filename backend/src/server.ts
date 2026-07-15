import "dotenv/config";
import cors from "cors";
import express from "express";
import { getJson } from "serpapi";

const app = express();
const port = process.env.PORT ?? 8001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/search-resources", async (req, res) => {
  const query = String(req.query.q ?? "").trim();

  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  if (!process.env.SERPAPI_API_KEY) {
    return res.status(500).json({ error: "Missing SERPAPI_API_KEY" });
  }

  try {
    const result = await getJson({
      engine: "google",
      api_key: process.env.SERPAPI_API_KEY,
      q: `${query} child psychology therapy worksheet intervention`,
      location: "Canada",
      hl: "en",
      gl: "ca",
    });

    const resources =
      result.organic_results?.map((item: any) => ({
        title: item.title,
        url: item.link,
        snippet: item.snippet,
        source: item.displayed_link,
      })) ?? [];

    res.json({ resources });
  } catch (error) {
    console.error("SerpAPI search failed: ", error);
    res.status(500).json({ error: " Search failed" });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
