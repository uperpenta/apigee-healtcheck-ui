import { useState, useEffect } from "react";
import { EnvironmentView } from "./components/EnvironmentView";
import { Header } from "./components/Header";
import type { CacheEntry } from "./types";

const ENVS = ["e2e", "uat", "prod"] as const;

function App() {
  const [activeEnv, setActiveEnv] = useState<string>("e2e");
  const [data, setData] = useState<Record<string, CacheEntry>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => {
        console.log("Response status:", res.status);
        return res.json();
      })
      .then((json: Record<string, CacheEntry>) => {
        console.log("Received data:", json);
        console.log("Keys:", Object.keys(json));
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        setLoading(false);
      });
  }, []);

  const entry = data[activeEnv];

  return (
    <div style={{ backgroundColor: "#FAFDFB", minHeight: "100vh" }}>
      <Header />
      <div className="max-w-3xl mx-auto p-5">

      <div className="flex gap-1 mb-5">
        {ENVS.map((env) => (
          <button
            key={env}
            onClick={() => setActiveEnv(env)}
            className={`px-5 py-2 rounded cursor-pointer transition-colors ${
              activeEnv === env
                ? "bg-blue-500 text-white font-bold"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {env.toUpperCase()}
          </button>
        ))}
      </div>

      {loading && <p className="text-gray-500">Loading...</p>}
      {!loading && !entry && (
        <p className="text-gray-500">No data for {activeEnv}</p>
      )}
      {!loading && entry && (
        <EnvironmentView data={entry.data} lastUpdated={entry.lastUpdated} />
      )}
      </div>
    </div>
  );
}

export default App;
