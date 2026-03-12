import dotenv from "dotenv";
dotenv.config();

export const isDev = process.env.NODE_ENV === "development";
export const PORT = Number(process.env.PORT) || 3001;
export const POLL_INTERVAL_MS = Number(process.env.POLL_INTERVAL_MS) || 600000;

export const environments = {
  e2e: process.env.E2E_HEALTH_URL!,
  uat: process.env.UAT_HEALTH_URL!,
  prod: process.env.PROD_HEALTH_URL!,
} as const;

export type EnvName = keyof typeof environments;
