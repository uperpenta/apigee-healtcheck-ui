import { environments, POLL_INTERVAL_MS, isDev } from "./config.js";
import type { EnvName } from "./config.js";
import { setCache } from "./cache.js";
import { mockResponse } from "./mock.js";

const fetchHealth = async (env: EnvName) => {
  if (isDev) {
    console.log(`[mock] ${env}`);
    setCache(env, mockResponse(env));
    return;
  }

  try {
    const res = await fetch(environments[env]);
    const data = await res.json();
    setCache(env, data);
    console.log(`[poll] ${env} — ${data.status}`);
  } catch (err) {
    console.error(`[poll] ${env} failed:`, err);
  }
};

const pollAll = () => {
  for (const env of Object.keys(environments) as EnvName[]) {
    fetchHealth(env);
  }
};

export const startPoller = () => {
  pollAll(); // fetch immediately on startup
  setInterval(pollAll, POLL_INTERVAL_MS); // then every 10 min
  console.log(`Poller started — interval: ${POLL_INTERVAL_MS}ms`);
};
