var DOMAIN = process.env.KINTONE_BASE_URL;
var APP_ID = 2;
var AUTH_VALUE = process.env.KINTONE_API_TOKEN;
var headers = { "X-Cybozu-API-Token": AUTH_VALUE };

import https from 'https';

function doRequest() {
    return new Promise((resolve, reject) => {
      var options = {
        hostname: DOMAIN,
        port: 443,
        path: "/k/v1/records.json?app=" + APP_ID,
        method: "GET",
        headers: headers
      };
      var req = https.request(options, function (res) {
        var data = "";
        res.setEncoding("utf8");
        res.on("data", function (chunk) {
          data += chunk;
        });
        res.on("end", function () {
          resolve(JSON.parse(data));
        })
      });
      req.on("error", function (e) {
        console.log("problem with request: " + e.message);
        reject(e.message);
      });
      req.end();
    });
}

export const handler = async (event) => {
  let response = await doRequest();
  return response;  
  
};
