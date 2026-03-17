import { useState } from "react";
import type { BackendDetails } from "../types";

interface Props {
  name: string;
  backend: BackendDetails;
}

const ResponseBody = ({ body }: { body: unknown }) => {
  if (typeof body === "string") {
    return (
      <pre className="whitespace-pre-wrap text-xs bg-gray-100 rounded p-2 mt-2">
        {body}
      </pre>
    );
  }
  return (
    <pre className="whitespace-pre-wrap text-xs bg-gray-100 rounded p-2 mt-2 overflow-auto max-h-60">
      {JSON.stringify(body, null, 2)}
    </pre>
  );
};

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
        <span className="font-semibold">{name}</span>
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
          {backend.serviceUri && (
            <p>
              <span className="font-medium">URI:</span> {backend.serviceUri}
            </p>
          )}
          <p>
            <span className="font-medium">Status Code:</span>{" "}
            {backend.StatusCode}
            {backend.ReasonPhrase && ` — ${backend.ReasonPhrase}`}
          </p>
          {backend.statusMessage && (
            <p>
              <span className="font-medium">Message:</span>{" "}
              {backend.statusMessage}
            </p>
          )}
          {backend.responseDateTime && (
            <p>
              <span className="font-medium">Response Time:</span>{" "}
              {backend.responseDateTime}
            </p>
          )}
          {backend["swagger-version"] && (
            <p>
              <span className="font-medium">Swagger:</span>{" "}
              {backend["swagger-version"]}
            </p>
          )}
          {backend["content-type"] && (
            <p>
              <span className="font-medium">Content-Type:</span>{" "}
              {backend["content-type"]}
            </p>
          )}
          {backend.resposeBody !== undefined && (
            <div>
              <span className="font-medium">Response Body:</span>
              <ResponseBody body={backend.resposeBody} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
