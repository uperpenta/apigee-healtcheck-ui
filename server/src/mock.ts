export const mockResponse = (env: string) => ({
  status: "DOWN",
  responseDateTime: new Date().toISOString(),
  components: {
    Apigee: {
      status: "UP",
      details: {
        proxy: {
          name: "IBO-Internal",
          release: "26Q1.2.1",
          revision: "53",
          status: "UP",
        },
      },
    },
    backends: {
      status: "DOWN",
      details: {
        filenetp8: {
          serviceUri: `https://${env}-filenet.svc.meshcore.net:9443/FileNet/Engine`,
          responseDateTime: new Date().toISOString(),
          StatusCode: 200,
          ReasonPhrase: "OK",
          status: "UP",
        },
        IBO_Andromeda: {
          serviceUri: `https://${env}-sca-services.global-issuing.net:4526/api/v2/health`,
          responseDateTime: new Date().toISOString(),
          StatusCode: "200",
          ReasonPhrase: "OK",
          status: "UP",
          resposeBody: { status: "UP" },
        },
        IBO_Centaurus: {
          serviceUri: `https://${env}-sca-services.global-issuing.net:4626/api/v2/health`,
          responseDateTime: new Date().toISOString(),
          StatusCode: "200",
          ReasonPhrase: "OK",
          status: "UP",
          resposeBody: { status: "UP" },
        },
        IBO_Gemini: {
          serviceUri: `https://${env}-ibo.services.wlip.net/api/v2/health`,
          responseDateTime: new Date().toISOString(),
          StatusCode: "200",
          ReasonPhrase: "OK",
          status: "UP",
          resposeBody: { status: "UP" },
          "content-type": "application/json",
        },
        IR_Andromeda: {
          serviceUri: `https://${env}-andromeda.global.worldline-solutions.com:4436/healthcheck`,
          responseDateTime: new Date().toISOString(),
          StatusCode: "200",
          ReasonPhrase: "OK",
          status: "UP",
          resposeBody:
            "* databaseCheck GODS DataSource=OK in 11 ms\n* databaseCheck APIDS DataSource=OK in 11 ms\n\nTotal execution time : 11 ms",
          "content-type": "text/plain;charset=UTF-8",
        },
        IR_Centaurus: {
          serviceUri: `https://${env}-tdfuji61s.sys.meshcore.net:7073/healthcheck`,
          responseDateTime: new Date().toISOString(),
          StatusCode: "503",
          ReasonPhrase: "Service Unavailable",
          status: "DOWN",
          statusMessage:
            "Proxy refused to create tunnel with response status 503",
        },
        IR_Gemini: {
          serviceUri: `https://${env}-irgw.services.wlipnopci.net/healthcheck`,
          responseDateTime: new Date().toISOString(),
          StatusCode: "200",
          ReasonPhrase: "OK",
          status: "UP",
          resposeBody:
            "* databaseCheck GODS DataSource=OK in 10 ms\n* databaseCheck APIDS DataSource=OK in 10 ms\n\nTotal execution time : 10 ms",
          "content-type": "text/plain;charset=UTF-8",
        },
        IssuerGW_Andromeda: {
          serviceUri: `https://${env}-sca-services.global-issuing.net:4428/api/internal/v1/health`,
          responseDateTime: new Date().toISOString(),
          StatusCode: "200",
          ReasonPhrase: "OK",
          status: "UP",
          resposeBody: {
            data: {
              components: {
                IssuerGateway: { status: "UP", "swagger-version": "2.39.1" },
              },
              allBackendStatus: { status: "DOWN" },
            },
            responseMetadata: { statusCode: 200, statusMessage: "OK" },
          },
          "swagger-version": "2.39.1",
        },
        IssuerGW_Centaurus: {
          serviceUri: `https://${env}-sca-services.global-issuing.net:4428/api/v2/health`,
          responseDateTime: new Date().toISOString(),
          StatusCode: "200",
          ReasonPhrase: "OK",
          status: "UP",
          resposeBody: {
            responseMetadata: { statusCode: 200, statusMessage: "OK" },
            data: { status: "OK" },
          },
        },
        IssuerGW_Gemini: {
          serviceUri: `https://${env}-sca-services.global-issuing.net:4428/api/v2/health`,
          responseDateTime: new Date().toISOString(),
          StatusCode: "200",
          ReasonPhrase: "OK",
          status: "UP",
          resposeBody: {
            responseMetadata: { statusCode: 200, statusMessage: "OK" },
            data: { status: "OK" },
          },
        },
        "wlp-fo-siboi-copernicus": {
          serviceUri: `http://${env}-tdife91s:8095/health`,
          responseDateTime: new Date().toISOString(),
          StatusCode: 200,
          ReasonPhrase: "OK",
          status: "UP",
        },
        "wlp-fo-siboi-davinci": {
          serviceUri: `http://${env}-tdife91s:8095/health`,
          responseDateTime: new Date().toISOString(),
          StatusCode: 200,
          ReasonPhrase: "OK",
          status: "UP",
        },
        "wlp-fo-siboi-gemini": {
          responseDateTime: new Date().toISOString(),
          StatusCode: 0,
          ReasonPhrase: null,
          status: "DOWN",
          statusMessage:
            "No healthcheck url configured for service wlp-fo-siboi-gemini",
        },
        "wlp-fo-siboi-modena": {
          serviceUri: `http://${env}-tdife91s:8095/health`,
          responseDateTime: new Date().toISOString(),
          StatusCode: 200,
          ReasonPhrase: "OK",
          status: "UP",
        },
      },
    },
  },
});
