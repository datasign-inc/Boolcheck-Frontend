import { createServer, Response as mirageResponse } from "miragejs";
import { getBackendUrl } from "../../config.ts";

import dataUrls from "./data/urls.json";
import dataUrlsId from "./data/urlsId.json";
import dataUrlsIdClaims from "./data/urlsIdClaims.json";
import dataClaimsId from "./data/claimsId.json";
import dataClaimersSub from "./data/claimersSub.json";
import dataClaimersIdClaims from "./data/claimersIdClaims.json";
import dataClaimsStates from "./data/claimsStates.json";
import dataAuthRequest from "./data/authRequest.json";
import dataConfirmClaim from "./data/dataConfirmClaim.json";
import dataUrlMetadata from "./data/urlMetadata.json";

export const setupMockApiServer = () => {
  createServer({
    routes() {
      this.get(
        getBackendUrl("/database/urls", "get"),
        (_, request) => {
          const url = request.queryParams["filter"];
          if (url && url === "https://already-registered-url.com") {
            return [];
          }
          return dataUrls;
        },
        {
          timing: 0,
        }
      );
      this.get(
        getBackendUrl("/database/urls/:id/metadata", "get"),
        () => dataUrlMetadata,
        {
          timing: 0,
        }
      );
      this.post(
        getBackendUrl("/database/urls", "post"),
        (_schema, request) => {
          const requestBody = JSON.parse(request.requestBody);
          if (requestBody.url === "https://already-registered-url.com") {
            return new mirageResponse(
              409,
              {},
              { instance: "/database/urls/url-uuid-123" }
            );
          }
          return new mirageResponse(200, {}, dataUrlsId);
        },
        { timing: 700 }
      );
      this.post(
        getBackendUrl("/oid4vp/auth-request", "post"),
        () => {
          return dataAuthRequest;
        },
        { timing: 0 }
      );
      this.get(getBackendUrl("/database/urls/:id", "get"), () => dataUrlsId, {
        timing: 0,
      });
      this.get(
        getBackendUrl("/database/urls/:id/claims", "get"),
        () => dataUrlsIdClaims,
        {
          timing: 500,
        }
      );
      this.get(
        getBackendUrl("/database/claims/:id", "get"),
        () => dataClaimsId,
        {
          timing: 0,
        }
      );
      this.get(
        getBackendUrl("/database/claimers/:claimerId", "get"),
        () => dataClaimersSub,
        {
          timing: 0,
        }
      );
      this.get(
        getBackendUrl("/oid4vp/comment/states", "get"),
        () => dataClaimsStates,
        {
          timing: 0,
        }
      );
      this.get(
        getBackendUrl("/database/claimers/:id/claims", "get"),
        () => dataClaimersIdClaims,
        {
          timing: 700,
        }
      );
      this.post(
        getBackendUrl("/oid4vp/comment/cancel", "post"),
        () => {
          return new Response(null, { status: 204 });
        },
        { timing: 0 }
      );
      this.post(
        getBackendUrl("/oid4vp/comment/confirm", "post"),
        () => dataConfirmClaim,
        { timing: 0 }
      );
    },
  });
};
