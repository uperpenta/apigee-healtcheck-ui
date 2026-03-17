export interface ProxyDetails {
  name: string;
  release: string;
  revision: string;
  status: string;
}

export interface BackendDetails {
  serviceUri?: string;
  responseDateTime?: string;
  StatusCode: string | number;
  ReasonPhrase: string | null;
  status: string;
  statusMessage?: string;
  "swagger-version"?: string;
  "content-type"?: string;
  resposeBody?: unknown;
}

export interface HealthResponse {
  status: string;
  responseDateTime: string;
  components: {
    Apigee: {
      status: string;
      details: {
        proxy: ProxyDetails;
      };
    };
    backends: {
      status: string;
      details: Record<string, BackendDetails>;
    };
  };
}

export interface CacheEntry {
  data: HealthResponse;
  lastUpdated: string;
}
