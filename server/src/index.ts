import express from "express";
import { PORT, environments } from "./config.js";
import type { EnvName } from "./config.js";
import { getCache, getAllCache } from "./cache.js";
import { startPoller } from "./poller.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import logger from "./logger.js";

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 30,
  message: { error: "Too many requests, try again later" },
});

app.use(
  cors({
    origin: ["http://localhost:5173"], //change with actual url
  }),
);

app.use('/api', limiter);

app.get("/api/health", (req, res) => {
  res.set("Cache-Control", "no-store");
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
  logger.info(`Server running on port ${PORT}`);
});
