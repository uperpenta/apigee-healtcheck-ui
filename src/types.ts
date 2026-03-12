export interface ProxyDetails {
  name: string;
  release: string;
  revision: string;
  status: string;
}

export interface BackendDetails {
  serviceUri: string;
  responseDateTime: string;
  StatusCode: string;
  ReasonPhrase: string;
  status: string;
  statusMessage: string;
  "swagger-version": string;
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
