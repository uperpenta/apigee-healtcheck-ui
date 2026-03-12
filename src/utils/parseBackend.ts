import type { BackendDetails } from "../types";

const KNOWN_PLATFORMS = [
  "andromeda",
  "centaurus",
  "gemini",
  "copernicus",
  "davinci",
];

interface ParsedBackend {
  service: string;
  platform: string | null;
  raw: string;
}

export interface GroupedBackend {
  service: string;
  raw: string;
  details: BackendDetails;
}

export const parseBackendName = (name: string): ParsedBackend => {
  const underscoreIdx = name.lastIndexOf("_");
  if (underscoreIdx !== -1) {
    const maybePlatform = name.slice(underscoreIdx + 1).toLowerCase();
    if (KNOWN_PLATFORMS.includes(maybePlatform)) {
      return {
        service: name.slice(0, underscoreIdx),
        platform: name.slice(underscoreIdx + 1),
        raw: name,
      };
    }
  }

  const dashIdx = name.lastIndexOf("-");
  if (dashIdx !== -1) {
    const maybePlatform = name.slice(dashIdx + 1).toLowerCase();
    if (KNOWN_PLATFORMS.includes(maybePlatform)) {
      return {
        service: name.slice(0, dashIdx),
        platform:
          name.charAt(dashIdx + 1).toUpperCase() + name.slice(dashIdx + 2),
        raw: name,
      };
    }
  }

  return { service: name, platform: null, raw: name };
};

export const groupByPlatform = (
  backends: Record<string, BackendDetails>,
): Record<string, GroupedBackend[]> => {
  const groups: Record<string, GroupedBackend[]> = {};

  for (const [name, details] of Object.entries(backends)) {
    const parsed = parseBackendName(name);
    const key = parsed.platform ?? "Other";

    if (!groups[key]) groups[key] = [];
    groups[key].push({ service: parsed.service, raw: parsed.raw, details });
  }

  return groups;
};
