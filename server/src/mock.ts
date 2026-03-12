export const mockResponse = (env: string) => ({
  status: "UP",
  responseDateTime: new Date().toISOString(),
  components: {
    Apigee: {
      status: "UP",
      details: {
        proxy: {
          name: `${env}-proxy`,
          release: "1.2.3",
          revision: "42",
          status: "UP",
        },
      },
    },
    backends: {
      status: "UP",
      details: {
        IR_Gemini: {
          serviceUri: `https://${env}.example.com/ir`,
          responseDateTime: new Date().toISOString(),
          StatusCode: "200",
          ReasonPhrase: "OK",
          status: "UP",
          statusMessage: "Service is running",
          "swagger-version": "2.0",
        },
        IR_Centaurus: {
          serviceUri: `https://${env}.example.com/ir-centaurus`,
          responseDateTime: new Date().toISOString(),
          StatusCode: "503",
          ReasonPhrase: "Service Unavailable",
          status: "DOWN",
          statusMessage: "Connection refused",
          "swagger-version": "2.0",
        },
      },
    },
  },
});
