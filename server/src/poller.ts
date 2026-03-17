import { environments, POLL_INTERVAL_MS, isDev } from "./config.js";
import type { EnvName } from "./config.js";
import { setCache } from "./cache.js";
import { mockResponse } from "./mock.js";
import logger from "./logger.js";

const fetchHealth = async (env: EnvName) => {
  if (isDev) {
    logger.info(`[mock] ${env}`);
    setCache(env, mockResponse(env));
    return;
  }

  try {
    const res = await fetch(environments[env]);
    const data = await res.json();
    setCache(env, data);
    logger.info(`[poll] ${env} — ${data.status}`);
  } catch (err) {
    logger.error(`[poll] ${env} failed`, err instanceof Error ? err : new Error(String(err)));
  }
};

const pollAll = () => {
  for (const env of Object.keys(environments) as EnvName[]) {
    fetchHealth(env);
  }
};

export const startPoller = () => {
  pollAll();
  setInterval(pollAll, POLL_INTERVAL_MS);
  logger.info(`Poller started — interval: ${POLL_INTERVAL_MS}ms`);
};
