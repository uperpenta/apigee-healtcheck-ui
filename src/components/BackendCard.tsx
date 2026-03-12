import { useState } from "react";
import type { BackendDetails } from "../types";

interface Props {
  name: string;
  backend: BackendDetails;
}

export const BackendCard = ({ name, backend }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const isUp = backend.status === "UP";

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`rounded-lg border p-3 mb-2 cursor-pointer transition-colors ${
        isUp
          ? "border-green-500 bg-green-50 hover:bg-green-100"
          : "border-red-500 bg-red-50 hover:bg-red-100"
      }`}
    >
      <div className="flex justify-between items-center">
        <span className="font-semibold text-black">{name}</span>
        <span
          className={`text-xs text-white px-2 py-0.5 rounded ${
            isUp ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {backend.status}
        </span>
      </div>

      {expanded && (
        <div className="mt-3 text-sm text-gray-700 space-y-1">
          <p>
            <span className="font-medium">URI:</span> {backend.serviceUri}
          </p>
          <p>
            <span className="font-medium">Status Code:</span>{" "}
            {backend.StatusCode} — {backend.ReasonPhrase}
          </p>
          <p>
            <span className="font-medium">Message:</span>{" "}
            {backend.statusMessage}
          </p>
          <p>
            <span className="font-medium">Response Time:</span>{" "}
            {backend.responseDateTime}
          </p>
          <p>
            <span className="font-medium">Swagger:</span>{" "}
            {backend["swagger-version"]}
          </p>
        </div>
      )}
    </div>
  );
};
