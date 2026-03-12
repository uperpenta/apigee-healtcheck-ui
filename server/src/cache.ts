import type { EnvName } from "./config.js";

interface CacheEntry {
  data: unknown;
  lastUpdated: Date;
}

const cache = new Map<EnvName, CacheEntry>();

export const setCache = (env: EnvName, data: unknown) => {
  cache.set(env, { data, lastUpdated: new Date() });
};

export const getCache = (env: EnvName): CacheEntry | undefined => {
  return cache.get(env);
};

export const getAllCache = () => {
  return Object.fromEntries(cache);
};
