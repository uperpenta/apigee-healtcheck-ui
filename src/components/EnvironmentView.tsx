import type { HealthResponse } from "../types";
import { BackendCard } from "./BackendCard";
import { groupByPlatform } from "../utils/parseBackend";

interface Props {
  data: HealthResponse;
  lastUpdated: string;
}

export const EnvironmentView = ({ data, lastUpdated }: Props) => {
  const { Apigee, backends } = data.components;
  const grouped = groupByPlatform(backends.details);

  // Show "Other" last
  const platforms = Object.keys(grouped).sort((a, b) =>
    a === "Other" ? 1 : b === "Other" ? -1 : a.localeCompare(b),
  );

  return (
    <div>
      <p style={{ fontSize: 12, color: "#888" }}>
        Last polled: {new Date(lastUpdated).toLocaleString()}
      </p>

      <div
        style={{
          border: `1px solid ${Apigee.status === "UP" ? "#22c55e" : "#ef4444"}`,
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
        }}
      >
        <strong>Apigee Proxy</strong> — {Apigee.details.proxy.name} (rev{" "}
        {Apigee.details.proxy.revision}, release {Apigee.details.proxy.release})
        <span
          style={{
            marginLeft: 8,
            background: Apigee.status === "UP" ? "#22c55e" : "#ef4444",
            color: "white",
            padding: "2px 8px",
            borderRadius: 4,
            fontSize: 12,
          }}
        >
          {Apigee.status}
        </span>
      </div>

      {platforms.map((platform) => (
        <div key={platform} style={{ marginBottom: 20 }}>
          <h3 style={{ borderBottom: "1px solid #ddd", paddingBottom: 4 }}>
            {platform}
          </h3>
          {grouped[platform].map(({ service, raw, details }) => (
            <BackendCard key={raw} name={service} backend={details} />
          ))}
        </div>
      ))}
    </div>
  );
};
