import express from "express";
import { PORT, environments } from "./config.js";
import type { EnvName } from "./config.js";
import { getCache, getAllCache } from "./cache.js";
import { startPoller } from "./poller.js";

const app = express();

app.get("/api/health", (req, res) => {
  res.json(getAllCache());
});

app.get("/api/health/:env", (req, res) => {
  const env = req.params.env as EnvName;
  if (!environments[env]) {
    return res.status(404).json({ error: "Unknown environment" });
  }
  const entry = getCache(env);
  if (!entry) {
    return res.status(503).json({ error: "Not yet polled" });
  }
  res.json(entry);
});

startPoller();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
