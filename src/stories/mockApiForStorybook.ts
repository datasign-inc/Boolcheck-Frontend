import { http, HttpResponse } from "msw";
import { getBackendUrl } from "../config.ts";
import dataClaimersSub from "../api/mock/data/claimersSub.json";
import dataClaimersIdClaims from "../api/mock/data/claimersIdClaims.json";
import dataUrls from "../api/mock/data/urls.json";
import dataUrlsId from "../api/mock/data/urlsId.json";
import dataUrlsIdClaims from "../api/mock/data/urlsIdClaims.json";
import dataClaimsId from "../api/mock/data/claimsId.json";
import dataClaimsStates from "../api/mock/data/claimsStates.json";
import dataAuthRequest from "../api/mock/data/authRequest.json";
import dataConfirmClaim from "../api/mock/data/dataConfirmClaim.json";

export const mockApiForStorybook = [
  http.post(getBackendUrl("/oid4vp/auth-request", "post"), ({ params }) => {
    console.log(`params: ${JSON.stringify(params)}`);
    return HttpResponse.json(dataAuthRequest);
  }),

  http.get(getBackendUrl("/database/claims/:id", "get"), ({ params }) => {
    console.log(`params: ${JSON.stringify(params)}`);
    return HttpResponse.json(dataClaimsId);
  }),

  http.get(getBackendUrl("/oid4vp/comment/states", "get"), ({ params }) => {
    console.log(`params: ${JSON.stringify(params)}`);
    return HttpResponse.json(dataClaimsStates);
  }),

  http.get(getBackendUrl("/database/urls/:id/claims", "get"), ({ params }) => {
    console.log(`params: ${JSON.stringify(params)}`);
    return HttpResponse.json(dataUrlsIdClaims);
  }),

  http.get(getBackendUrl("/database/urls/:id", "get"), ({ params }) => {
    console.log(`params: ${JSON.stringify(params)}`);
    return HttpResponse.json(dataUrlsId);
  }),

  http.get(getBackendUrl("/database/urls", "get"), ({ params }) => {
    console.log(`params: ${JSON.stringify(params)}`);
    return HttpResponse.json(dataUrls);
  }),

  http.get(
    getBackendUrl("/database/claimers/:claimerId", "get"),
    ({ params }) => {
      console.log(`params: ${JSON.stringify(params)}`);
      return HttpResponse.json(dataClaimersSub);
    }
  ),
  http.get(
    getBackendUrl("/database/claimers/:id/claims", "get"),
    ({ params }) => {
      console.log(`params: ${JSON.stringify(params)}`);
      return HttpResponse.json(dataClaimersIdClaims);
    }
  ),
  http.post(getBackendUrl("/oid4vp/comment/cancel", "post"), ({ params }) => {
    console.log(`params: ${JSON.stringify(params)}`);
    return new HttpResponse(null, { status: 204 }); // 空のレスポンスボディと204ステータス
  }),
  http.post(getBackendUrl("/oid4vp/comment/confirm", "post"), ({ params }) => {
    console.log(`params: ${JSON.stringify(params)}`);
    return HttpResponse.json(dataConfirmClaim);
  }),
];
